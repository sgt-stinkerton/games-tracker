package com.gametracker.backend.dto.gameEntry;

import com.gametracker.backend.enums.Status;

import java.time.LocalDate;

// TODO this sooo needs to be split into multiple dtos

public record GameEntryInfoDTO(
        Long id,
        Long userId,
        Long gameId,
        Status status,
        String notes,
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
