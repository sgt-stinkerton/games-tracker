package com.gametracker.backend.model;

import com.gametracker.backend.dto.game.GameInfoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Year;
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
    private String steamAppId;

    private String title;

    @Column(length = 400)
    private String description;

    @Column(name = "release_year")
    private Year releaseYear;

    @Column(name = "steam_achievements")
    private Integer steamAchievements;

    @Column(name = "header_image_url")
    private String headerImageUrl;

    @ElementCollection // Stores a simple list of strings in a separate table
    @CollectionTable(name = "game_tags", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "tag")
    private List<String> tags;

    // --- methods ---

    public Game() {}

    public Game(String steamAppId, String title, Year releaseYear, List<String> tags) {
        this.steamAppId = steamAppId;
        this.title = title;
        this.releaseYear = releaseYear;
        this.tags = tags;
    }

    public GameInfoDTO toDTO() {
        return new GameInfoDTO(
                id,
                steamAppId,
                title,
                description,
                releaseYear,
                headerImageUrl,
                steamAchievements,
                tags
        );
    }

}
