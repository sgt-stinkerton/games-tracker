package com.gametracker.backend.dto.game;

import java.time.LocalDate;

public record GameInfoDTO (
        Long id,
        Long steamAppId,
        String title,
        LocalDate releaseDate
) {}

