package com.gametracker.backend.dto.user;

import jakarta.validation.constraints.NotBlank;

public record UserCreationDTO (
    @NotBlank(message = "Display name cannot be empty")
    String displayName
) {}
