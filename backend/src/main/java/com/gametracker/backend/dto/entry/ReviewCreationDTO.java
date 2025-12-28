package com.gametracker.backend.dto.entry;

import java.time.LocalDate;

// TODO validation to make rating nums be between 0 and 10
// TODO other validation

public record ReviewCreationDTO(
        String reviewText,
        LocalDate finishDate,
        Double enjoyment,
        Double gameplay,
        Double story,
        Double visuals,
        Double sound
) {}
