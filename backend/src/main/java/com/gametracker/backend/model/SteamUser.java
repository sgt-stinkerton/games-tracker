package com.gametracker.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "steam_users")
@Getter @Setter
public class SteamUser {

    // --- id and linking fields ---

    @Id
    @Column(name = "steam_id", nullable = false, unique = true)
    private Long id;

    // --- other fields ---

    @Column(name = "last_synced")
    private LocalDateTime lastSynced;

}
