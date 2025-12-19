package com.gametracker.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "games")
@Getter @Setter
public class Game {

    // --- fields ---

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id", nullable = false, unique = true)
    private Long id;

    @Column(name = "steam_app_id", unique = true)
    private Long steamAppId;

    private String title;

    private String headerImage;

    @Column(name = "release_date")
    private LocalDate releaseDate;

}
