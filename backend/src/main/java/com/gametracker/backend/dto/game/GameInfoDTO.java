package com.gametracker.backend.dto.game;

import java.time.Year;

public record GameInfoDTO (
        Long id,
        Long steamAppId,
        String title,
        Year releaseYear
) {}

