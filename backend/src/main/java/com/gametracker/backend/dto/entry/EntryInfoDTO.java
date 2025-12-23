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
        Integer currentAchievements,
        String reviewText,
        LocalDate finishDate,
        Double rating,
        Double enjoyment,
        Double gameplay,
        Double story,
        Double visuals,
        Double sound
) {}
