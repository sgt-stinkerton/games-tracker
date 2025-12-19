package com.gametracker.backend.controller;

import com.gametracker.backend.dto.game.GameCreationDTO;
import com.gametracker.backend.dto.game.GameInfoDTO;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.service.GameService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
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
}
