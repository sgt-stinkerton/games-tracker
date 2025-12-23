package com.gametracker.backend.model;

import com.gametracker.backend.dto.user.UserInfoDTO;

import com.gametracker.backend.enums.Theme;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {

    // --- fields ---

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false, unique = true)
    private Long id;

    @Column(name = "steam_id", unique = true)
    private String steamId;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "last_synced")
    private LocalDateTime lastSynced;

    private Theme theme;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Entry> gameEntries;

    // --- methods ---

    public User () {}

    public User(String steamId, String displayName) {
        this.steamId = steamId;
        this.displayName = displayName;
        this.theme = Theme.LIGHT;
    }

    public UserInfoDTO toDTO() {
        return new UserInfoDTO(
                this.id,
                this.steamId,
                this.displayName,
                this.lastSynced,
                this.theme
        );
    }

}
