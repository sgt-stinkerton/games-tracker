package com.gametracker.backend.model;

import com.gametracker.backend.dto.game.GameInfoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

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

    @Column(name = "release_date")
    private LocalDate releaseDate;

    // --- methods ---

    public Game() {}

    public Game(Long steamAppId, String title, LocalDate releaseDate) {
        this.steamAppId = steamAppId;
        this.title = title;
        this.releaseDate = releaseDate;
    }

    public GameInfoDTO toDTO() {
        return new GameInfoDTO(
                id,
                steamAppId,
                title,
                releaseDate
        );
    }

}
