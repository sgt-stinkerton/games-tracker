package com.gametracker.backend.repository;

import com.gametracker.backend.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
