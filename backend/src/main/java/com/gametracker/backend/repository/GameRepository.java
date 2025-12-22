package com.gametracker.backend.repository;

import com.gametracker.backend.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findBySteamAppId(String steamAppId);
    Optional<Game> findByTitleIgnoreCase(String title);
}
