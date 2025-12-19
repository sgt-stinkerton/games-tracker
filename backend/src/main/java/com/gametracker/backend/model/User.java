package com.gametracker.backend.model;

import com.gametracker.backend.dto.user.UserInfoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    private Long steamId;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserGame> userGames;

    // --- methods ---

    public User () {}

    public User(Long steamId, String displayName) {
        this.steamId = steamId;
        this.displayName = displayName;
    }

    public UserInfoDTO toDTO() {
        return new UserInfoDTO(
                this.id,
                this.steamId,
                this.displayName
        );
    }

}
