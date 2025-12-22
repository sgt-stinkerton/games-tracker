package com.gametracker.backend.repository;

import com.gametracker.backend.model.Entry;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EntryRepository extends JpaRepository<Entry, Long> {
    Optional<Entry> findByGameId(Long gameId);
}
