package com.gametracker.backend.dto.library;

import com.gametracker.backend.enums.Status;

// TODO status must be valid selection of enum

public record LibraryUpdateDTO(
        Status status,
        String notes
) {}
