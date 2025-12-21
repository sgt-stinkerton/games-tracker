package com.gametracker.backend.dto.entry;

import com.gametracker.backend.enums.Status;

// TODO status must be valid selection of enum

public record EntryUpdateDTO(
        Status status,
        String notes
) {}
