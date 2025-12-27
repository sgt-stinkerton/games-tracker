package com.gametracker.backend.controller;

import com.gametracker.backend.dto.game.GameCreationDTO;
import com.gametracker.backend.dto.game.GameInfoDTO;
import com.gametracker.backend.model.Entry;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.service.EntryService;
import com.gametracker.backend.service.GameService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {
    private final GameService gameService;
    private final EntryService entryService;

    @Autowired
    public GameController(GameService gameService, EntryService entryService) {
        this.gameService = gameService;
        this.entryService = entryService;
    }

    /**
     * gets all games
     * @return a list of DTOs containing the information for every game (in the database)
     */
    @GetMapping({"", "/"})
    public ResponseEntity<List<GameInfoDTO>> getAllGames() {
        return ResponseEntity.status(HttpStatus.OK).body(gameService.getAll()
                .stream()
                .map(Game::toDTO)
                .toList());
    }

    /**
     * gets the data of a specific game by its ID
     * @param id id of the game being searched for
     * @return DTO containing data of the game with the given id
     */
    @GetMapping({"/{id}"})
    public ResponseEntity<GameInfoDTO> getGameById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(gameService.getById(id).toDTO());
    }

    /**
     * creates a game entry
     * @param dto game creation DTO
     * @return DTO containing information of newly created game
     */
    @PostMapping({"", "/"})
    public ResponseEntity<GameInfoDTO> createGame(@Valid @RequestBody GameCreationDTO dto) {
        Game newGame = gameService.createGame(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGame.toDTO());
    }

    @DeleteMapping({ "/{id}"})
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        if (gameService.getById(id) != null) {
            Entry entry = entryService.getByGameId(id);
            if (entry != null) {
                entryService.delete(entry.getId());
            }
            gameService.delete(id);
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sync")
    public ResponseEntity<Void> syncGame(@RequestParam String appId,
                                         @RequestParam(required = false) String name) {
        gameService.syncGame(appId, name);
        return ResponseEntity.ok().build();
    }
}
