package com.gametracker.backend.dto.game;

import jakarta.validation.constraints.NotBlank;

import java.time.Year;
import java.util.List;

// TODO validation

public record GameCreationDTO (
        @NotBlank(message = "Title cannot be empty")
        String title,
        Year releaseYear,
        List<String> tags,
        String description,
        String headerImageUrl
) {}
