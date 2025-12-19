package com.gametracker.backend.dto.user;

public record UserInfoDTO (
    Long id,
    Long steamId,
    String displayName
) {}
