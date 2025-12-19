package com.gametracker.backend.service;

import com.gametracker.backend.dto.gameEntry.GameEntryCreationDTO;
import com.gametracker.backend.dto.gameEntry.ReviewCreationDTO;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.GameEntry;
import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.GameEntryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class GameEntryService {
    private final GameEntryRepository gameEntryRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public GameEntryService(GameEntryRepository gameEntryRepository,
                            UserRepository userRepository,
                            GameRepository gameRepository) {
        this.gameEntryRepository = gameEntryRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    public List<GameEntry> getAll() {
        return gameEntryRepository.findAll();
    }

    public GameEntry getById(Long id) {
        return gameEntryRepository.findById(id).orElseThrow(); // TODO exception here
    }

    public GameEntry createEntry(GameEntryCreationDTO dto) {
        User user = userRepository.findById(dto.userId()).orElseThrow(); // TODO exception
        Game game = gameRepository.findById(dto.gameId()).orElseThrow(); // TODO exception
        GameEntry newGameEntry = new GameEntry(user, game, dto.status(), dto.notes());
        return gameEntryRepository.save(newGameEntry);
    }

    public GameEntry createReview(long id, ReviewCreationDTO dto) {
        GameEntry targetEntry = gameEntryRepository.findById(id).orElseThrow(); // TODO write exception for this

        targetEntry.setFullAchievements(dto.fullAchievements());
        targetEntry.setReviewText(dto.reviewText());
        targetEntry.setFinishDate(dto.finishDate());
        targetEntry.setRating(dto.rating());
        targetEntry.setEnjoyment(dto.enjoyment());
        targetEntry.setGameplay(dto.gameplay());
        targetEntry.setStory(dto.story());
        targetEntry.setVisuals(dto.visuals());
        targetEntry.setSound(dto.sound());

        return gameEntryRepository.save(targetEntry);
    }

}
