package com.gametracker.backend.dto.user;

import com.gametracker.backend.enums.Theme;

import java.time.LocalDateTime;

public record UserInfoDTO (
    Long id,
    String steamId,
    String displayName,
    LocalDateTime lastSynced
) {}
