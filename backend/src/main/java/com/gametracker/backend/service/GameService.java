package com.gametracker.backend.service;

import com.gametracker.backend.dto.game.GameCreationDTO;
import com.gametracker.backend.enums.AllowedTags;
import com.gametracker.backend.enums.Status;
import com.gametracker.backend.model.Entry;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.repository.EntryRepository;
import com.gametracker.backend.repository.GameRepository;

import com.gametracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.databind.JsonNode;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GameService {
    private final GameRepository gameRepository;
    private final SteamService steamService;
    private final EntryRepository entryRepository;
    private final UserRepository userRepository;

    @Autowired
    public GameService(GameRepository gameRepository, SteamService steamService,
                       EntryRepository entryRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.steamService = steamService;
        this.entryRepository = entryRepository;
        this.userRepository = userRepository;
    }

    public List<Game> getAll() {
        return gameRepository.findAll();
    }

    public Game getById(long id) {
        return gameRepository.findById(id).orElseThrow(); // TODO exception
    }

    public Game createGame(GameCreationDTO dto) {
        Game newGame = new Game(dto.title(), dto.releaseYear(), dto.tags());
        return gameRepository.save(newGame);
    }

    public void delete(long id) {
        gameRepository.deleteById(id);
    }

    public void syncGame(String appId, String nameFromSteam) {
        // find existing game with steam app id
        boolean creatingNew = false;
        Game game = gameRepository.findBySteamAppId(appId).orElse(null);

        // if game with steam app id doesn't exist, then find game with equivalent title
        if (game == null && nameFromSteam != null) {
            game = gameRepository.findByTitleIgnoreCase(nameFromSteam).orElse(null);
        }

        // if no game with the given id and title exist, then make a new game
        if (game == null) {
            creatingNew = true;
            game = new Game();
            game.setTitle(nameFromSteam != null ? nameFromSteam : "Unknown Game " + appId);
        }

        // set basic info and save (so id can be used for entry)
        game.setSteamAppId(appId);
        game.setHeaderImageUrl("https://steamcdn-a.akamaihd.net/steam/apps/" + appId + "/header.jpg");
        game = gameRepository.save(game);

        // try-catch used so that program doesn't halt on a steam store error
        try {
            fetchGameDetails(game, appId, creatingNew);
            game = gameRepository.save(game);
        } catch (Exception e) {
            System.err.println("Failed to fetch store details for " + appId);
        }

        // find existing entry or make new one if none exists
        Entry entry = entryRepository.findByGameId(game.getId()).orElse(new Entry());
        if (entry.getGame() == null) {
            entry.setGame(game);
            entry.setUser(userRepository.findById(1L).orElseThrow());
            entry.setStatus(Status.TO_PLAY);
        }

        // try to get user steam achievements for that game
        try {
            fetchUserProgress(entry, userRepository.findById(1L).get().getSteamId(), appId);
        } catch (Exception e) {
            System.err.println("Failed to fetch achievements for " + appId);
        }

        entryRepository.save(entry);
    }

    private void fetchGameDetails(Game game, String appId, boolean creatingNew) {
        try {
            JsonNode storeData = steamService.getStoreDetails(appId);

            if (storeData != null && storeData.has(appId) && storeData.get(appId).get("success").asBoolean()) {
                JsonNode data = storeData.get(appId).get("data");

                // set description (steam page short description)
                if (data.has("short_description")) {
                    if (creatingNew || (game.getDescription() == null)) {
                        game.setDescription(data.get("short_description").asText());
                    } else {
                        System.out.println("not replacing description");
                    }
                }

                // set release year
                if (data.has("release_date")) {
                    String date = data.get("release_date").get("date").asText();
                    if (date.length() >= 4) {
                        game.setReleaseYear(Year.parse(date.substring(date.length() - 4)));
                    }
                }

                // set tags
                if (creatingNew || (game.getTags().isEmpty())) {
                    List<String> newTags = new ArrayList<>();
                    if (data.has("genres")) {
                        int count = 0;
                        for (JsonNode g : data.get("genres")) {
                            if (count >= 3) break;
                            String tag = g.get("description").asText();
                            try {
                                AllowedTags check = AllowedTags.valueOf(tag.toUpperCase().replaceAll("-", "").replaceAll(" ", "_"));
                                newTags.add(g.get("description").asText());
                                count++;
                            } catch (Exception e) {
                                System.err.println("Tag not allowed: " + tag);
                            }
                        }
                    }
                    game.setTags(newTags);
                } else {
                    System.out.println("not replacing tags");
                }

                // set game's number of achievements
                if (data.has("achievements")) {
                    Integer achievements = data.get("achievements").get("total").asInt();
                    game.setSteamAchievements(achievements);
                } else {
                    game.setSteamAchievements(0);
                }
            }
        } catch (Exception e) {
            System.err.println("Game detail fetch failed for " + appId + ": " + e.getMessage());
        }
    }

    private void fetchUserProgress(Entry entry, String steamId, String appId) {
        try {
            JsonNode achData = steamService.getGameAchievements(steamId, appId);

            if (achData != null && achData.has("playerstats")) {
                JsonNode stats = achData.get("playerstats");

                if (stats.has("achievements")) {
                    JsonNode achievements = stats.get("achievements");

                    // get num of achievements user has unlocked
                    int unlocked = 0;
                    for (JsonNode item : achievements) {
                        if (item.get("achieved").asInt() == 1) unlocked++;
                    }
                    entry.setCurrentAchievements(unlocked);
                }
            }
        } catch (Exception e) {
            // if achievements fail (hidden profile or no achievements), ensure it's not null
            if (entry.getCurrentAchievements() == null) entry.setCurrentAchievements(0);
        }
    }
}
