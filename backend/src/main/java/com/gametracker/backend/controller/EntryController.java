package com.gametracker.backend.controller;

import com.gametracker.backend.dto.entry.EntryCreationDTO;
import com.gametracker.backend.dto.entry.EntryInfoDTO;
import com.gametracker.backend.dto.entry.ReviewCreationDTO;
import com.gametracker.backend.enums.Status;
import com.gametracker.backend.model.Entry;
import com.gametracker.backend.service.EntryService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entries")
public class EntryController {
    private final EntryService entryService;

    @Autowired
    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<EntryInfoDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(entryService.getAll()
                .stream()
                .map(Entry::toDTO)
                .toList());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<EntryInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(entryService.getById(id).toDTO());
    }

    @GetMapping({"/game/{id}"})
    public ResponseEntity<EntryInfoDTO> getByGameId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(entryService.getByGameId(id).toDTO());
    }

    @PostMapping({"", "/"})
    public ResponseEntity<EntryInfoDTO> createEntry(@Valid @RequestBody EntryCreationDTO dto) {
        Entry newEntry = entryService.createEntry(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEntry.toDTO());
    }

    @PatchMapping({"/{id}/status"})
    public ResponseEntity<EntryInfoDTO> updateStatus(@PathVariable Long id,
                                                     @RequestParam Status status) {
        Entry updatedEntry = entryService.updateStatus(id, status);
        return ResponseEntity.status(HttpStatus.OK).body(updatedEntry.toDTO());
    }

    @PatchMapping({"/{id}/notes"})
    public ResponseEntity<EntryInfoDTO> updateNotes(@PathVariable Long id,
                                                    @Valid @RequestBody EntryCreationDTO dto) {
        Entry updatedEntry = entryService.updateNotes(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedEntry.toDTO());
    }

    @PutMapping({"/{id}/review"})
    public ResponseEntity<EntryInfoDTO> createReview(@PathVariable long id,
                                                     @Valid @RequestBody ReviewCreationDTO dto) {
        Entry newReview = entryService.createReview(id, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReview.toDTO());
    }
}
