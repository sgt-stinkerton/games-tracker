package com.gametracker.backend.dto.library;

import java.time.LocalDate;

// TODO validation to make rating nums be between 0 and 10
// TODO other validation

public record ReviewCreationDTO(
        Integer fullAchievements,
        String reviewText,
        LocalDate finishDate,
        Integer rating,
        Integer enjoyment,
        Integer gameplay,
        Integer story,
        Integer visuals,
        Integer sound
) {}
