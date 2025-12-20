package com.gametracker.backend.service;

import com.gametracker.backend.dto.game.GameCreationDTO;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.repository.GameRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class GameService {
    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getAll() {
        return gameRepository.findAll();
    }

    public Game getById(long id) {
        return gameRepository.findById(id).orElseThrow(); // TODO exception
    }

    public Game createGame(GameCreationDTO dto) {
        Game newGame = new Game(dto.steamAppId(), dto.title(), dto.releaseYear());
        return gameRepository.save(newGame);
    }

}
