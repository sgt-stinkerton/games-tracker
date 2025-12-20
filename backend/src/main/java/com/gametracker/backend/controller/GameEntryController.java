package com.gametracker.backend.controller;

import com.gametracker.backend.dto.gameEntry.GameEntryCreationDTO;
import com.gametracker.backend.dto.gameEntry.GameEntryInfoDTO;
import com.gametracker.backend.dto.gameEntry.ReviewCreationDTO;
import com.gametracker.backend.model.GameEntry;
import com.gametracker.backend.service.GameEntryService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// TODO thinking about merging this with game controller

@RestController
@RequestMapping("/games-entry")
public class GameEntryController {
    private final GameEntryService gameEntryService;

    @Autowired
    public GameEntryController(GameEntryService gameEntryService) {
        this.gameEntryService = gameEntryService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<GameEntryInfoDTO>> getAllGameEntries() {
        return ResponseEntity.status(HttpStatus.OK).body(gameEntryService.getAll()
                .stream()
                .map(GameEntry::toDTO)
                .toList());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<GameEntryInfoDTO> getEntryById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(gameEntryService.getById(id).toDTO());
    }

    @PostMapping({"", "/"})
    public ResponseEntity<GameEntryInfoDTO> createGameEntry(@Valid @RequestBody GameEntryCreationDTO dto) {
        GameEntry newGameEntry = gameEntryService.createEntry(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGameEntry.toDTO());
    }

    @PutMapping({"/{id}/review"})
    public ResponseEntity<GameEntryInfoDTO> createReview(@PathVariable long id,
                                                         @Valid @RequestBody ReviewCreationDTO dto) {
        GameEntry newReview = gameEntryService.createReview(id, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReview.toDTO());
    }

}
