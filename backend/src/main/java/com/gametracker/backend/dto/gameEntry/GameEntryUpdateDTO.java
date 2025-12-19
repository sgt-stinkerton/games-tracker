package com.gametracker.backend.dto.gameEntry;

import com.gametracker.backend.enums.Status;

// TODO status must be valid selection of enum

public record GameEntryUpdateDTO(
        Status status,
        String notes
) {}
