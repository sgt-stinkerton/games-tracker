package com.gametracker.backend.controller;

import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.UserRepository;
import com.gametracker.backend.service.SteamService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/steam")
public class SteamController {
    private final UserRepository userRepository;
    private final SteamService steamService;

    private final String FRONTEND_URL = "http://localhost:5173/#/profile";

    public SteamController(UserRepository userRepository, SteamService steamService) {
        this.userRepository = userRepository;
        this.steamService = steamService;
    }

    // user redirected to steam to connect account
    @GetMapping("/link")
    public void getOpenIdLink(HttpServletResponse response) throws IOException {
        String url = steamService.getOpenIdUrl();
        response.sendRedirect(url);
    }

    // user returns from steam, connect steam id to user data
    @GetMapping("/callback")
    public void callback(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String steamId = steamService.verifyOpenIdLogin(request.getParameterMap());
        if (steamId != null) {
            User user = userRepository.findById(1L).orElseThrow();
            user.setSteamId(steamId);
            userRepository.save(user);
            response.sendRedirect(FRONTEND_URL + "?success=true");
        } else {
            response.sendRedirect(FRONTEND_URL + "?error=failed");
        }
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Map<String, Object>>> getOwnedGameIds() {
        try {
            // get user (and throw bad request if they haven't connected their steam)
            User user = userRepository.findById(1L).get();
            if (user.getSteamId() == null) {
                return ResponseEntity.badRequest().build();
            }

            // fetch and parse owned games
            List<Map<String, Object>> games = steamService.getOwnedGamesAsList(user.getSteamId());

            user.setLastSynced(LocalDateTime.now());
            userRepository.save(user);
            return ResponseEntity.ok(games);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}