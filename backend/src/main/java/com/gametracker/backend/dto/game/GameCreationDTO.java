package com.gametracker.backend.dto.game;

import jakarta.validation.constraints.NotBlank;

import java.time.Year;

public record GameCreationDTO (
        Long steamAppId,
        @NotBlank(message = "Title cannot be empty")
        String title,
        Year releaseYear
) {}
