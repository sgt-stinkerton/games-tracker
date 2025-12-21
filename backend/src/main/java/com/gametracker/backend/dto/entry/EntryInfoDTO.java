package com.gametracker.backend.dto.entry;

import com.gametracker.backend.dto.game.GameInfoDTO;
import com.gametracker.backend.enums.Status;

import java.time.LocalDate;

// TODO this sooo needs to be split into multiple dtos

public record EntryInfoDTO(
        Long id,
        Long userId,
        GameInfoDTO game,
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
