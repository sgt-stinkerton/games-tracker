package com.gametracker.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "game_reviews")
@Getter @Setter
public class Review {

    // --- id and linking fields ---

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", nullable = false, unique = true)
    private Integer id;

    // --- other fields ---

    @Column(name = "finished_date")
    private LocalDate finishedDate;

    @Column(name = "review_text")
    private String reviewText;

    private Integer rating;

    private Integer enjoyment;

    private Integer gameplay;

    private Integer story;

    private Integer visuals;

    private Integer sound;

}
