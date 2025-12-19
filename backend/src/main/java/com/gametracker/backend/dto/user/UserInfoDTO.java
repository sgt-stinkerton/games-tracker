package com.gametracker.backend.dto.user;

import java.time.LocalDateTime;

public record UserInfoDTO (
    Long id,
    Long steamId,
    String displayName,
    LocalDateTime lastSynced
) {}
