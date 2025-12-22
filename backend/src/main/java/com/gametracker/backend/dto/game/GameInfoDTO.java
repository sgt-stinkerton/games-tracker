package com.gametracker.backend.dto.game;

import java.time.Year;
import java.util.List;

public record GameInfoDTO (
        Long id,
        String steamAppId,
        String title,
        String description,
        Year releaseYear,
        String headerImageUrl,
        Integer steamAchievements,
        List<String> tags
) {}

