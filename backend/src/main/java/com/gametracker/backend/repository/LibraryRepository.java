package com.gametracker.backend.repository;

import com.gametracker.backend.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library, Long> {
}
