package com.gametracker.backend.controller;

import com.gametracker.backend.dto.library.LibraryCreationDTO;
import com.gametracker.backend.dto.library.LibraryInfoDTO;
import com.gametracker.backend.dto.library.ReviewCreationDTO;
import com.gametracker.backend.model.Library;
import com.gametracker.backend.service.LibraryService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journals")
public class LibraryController {
    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<LibraryInfoDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(libraryService.getAll()
                .stream()
                .map(Library::toDTO)
                .toList());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<LibraryInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(libraryService.getById(id).toDTO());
    }

    @PostMapping({"", "/"})
    public ResponseEntity<LibraryInfoDTO> createEntry(@Valid @RequestBody LibraryCreationDTO dto) {
        Library newLibrary = libraryService.createEntry(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newLibrary.toDTO());
    }

    @PutMapping({"/{id}/review"})
    public ResponseEntity<LibraryInfoDTO> createReview(@PathVariable long id,
                                                       @Valid @RequestBody ReviewCreationDTO dto) {
        Library newReview = libraryService.createReview(id, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReview.toDTO());
    }

}
