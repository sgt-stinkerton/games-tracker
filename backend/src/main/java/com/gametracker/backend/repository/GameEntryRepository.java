package com.gametracker.backend.repository;

import com.gametracker.backend.model.GameEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameEntryRepository extends JpaRepository<GameEntry, Long> {
}
