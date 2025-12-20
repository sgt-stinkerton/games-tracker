package com.gametracker.backend.dto.library;

import com.gametracker.backend.enums.Status;

// TODO status must be valid selection of enum

public record LibraryCreationDTO(
        Long userId,
        Long gameId,
        Status status,
        String notes
) {}
