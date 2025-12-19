package com.gametracker.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record UserCreationDTO (
    Long steamId,

    @NotBlank(message = "Display name cannot be empty")
    String displayName
) {}
