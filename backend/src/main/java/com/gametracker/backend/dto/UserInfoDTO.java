package com.gametracker.backend.dto;

public record UserInfoDTO (
    Long id,
    Long steamId,
    String displayName
) {}
