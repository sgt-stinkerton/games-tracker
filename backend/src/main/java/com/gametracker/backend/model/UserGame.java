package com.gametracker.backend.model;

import com.gametracker.backend.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

// TODO owned?

@Entity
@Table(name = "user_games")
@Getter @Setter
public class UserGame {

    // --- fields ---

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_game_id", nullable = false, unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    private String notes;

    @Column(name = "full_achievements")
    private Integer fullAchievements;

    @Column(name = "review_text")
    private String reviewText;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    private Integer rating;

    // 5 types of sub-rating
    private Integer enjoyment;
    private Integer gameplay;
    private Integer story;
    private Integer visuals;
    private Integer sound;
}
