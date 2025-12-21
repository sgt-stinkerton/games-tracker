package com.gametracker.backend.dto.entry;

import com.gametracker.backend.enums.Status;

// TODO status must be valid selection of enum

public record EntryCreationDTO(
        Long userId,
        Long gameId,
        Status status,
        String notes
) {}
