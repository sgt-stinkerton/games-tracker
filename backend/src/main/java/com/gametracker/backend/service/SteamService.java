package com.gametracker.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

@Service
public class SteamService {
    private final RestClient restClient;
    private final String apiKey;
    private final ObjectMapper objectMapper;

    private final String STEAM_RETURN_URL = "http://localhost:8080/steam/callback";

    // @Value pulls things from config file
    public SteamService(@Value("${steam.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.restClient = RestClient.create();
        this.objectMapper = new ObjectMapper();
    }

    // returns basic info: appid, name, playtime
    public JsonNode getOwnedGames(String steamId) {
        String url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/" +
                "?key=" + apiKey +
                "&steamid=" + steamId +
                "&include_appinfo=true" +
                "&format=json";
        return fetchFromSteam(url);
    }

    public JsonNode getGameAchievements(String steamId, String appId) {
        String url = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/" +
                "?key=" + apiKey +
                "&steamid=" + steamId +
                "&appid=" + appId;
        return fetchFromSteam(url);
    }

    // 3. Get Store Tags for ONE Game (No API Key needed)
    public JsonNode getStoreDetails(String appId) {
        String url = "https://store.steampowered.com/api/appdetails?appids=" + appId +"&l=english";
        return fetchFromSteam(url);
    }

    private JsonNode fetchFromSteam(String url) {
        try {
            // fetch as string first to avoid type errors with jsonnode
            String raw = restClient.get().uri(url).retrieve().body(String.class);
            return raw != null ? objectMapper.readTree(raw) : null;
        } catch (Exception e) {
            System.err.println("Steam API Error [" + url + "]: " + e.getMessage());
            return null;
        }
    }

    // get link to connect account (steam link)
    public String getOpenIdUrl() {
        return "https://steamcommunity.com/openid/login" +
                "?openid.ns=http://specs.openid.net/auth/2.0" +
                "&openid.mode=checkid_setup" +
                "&openid.return_to=" + STEAM_RETURN_URL +
                "&openid.realm=" + STEAM_RETURN_URL +
                "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
                "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select";
    }

    // returns steamId if valid, null if not
    public String verifyOpenIdLogin(Map<String, String[]> params) {
        if (params == null || !params.containsKey("openid.mode")) return null;

        // prepare validation request
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("openid.ns", "http://specs.openid.net/auth/2.0");
        formData.add("openid.mode", "check_authentication");

        // handle the String[] -> String conversion
        params.forEach((key, values) -> {
            if (values != null && values.length > 0 && !key.equals("openid.mode") && !key.equals("openid.ns")) {
                formData.add(key, values[0]);
            }
        });

        String response = restClient.post()
                .uri("https://steamcommunity.com/openid/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(formData)
                .retrieve()
                .body(String.class);

        if (response != null && response.contains("is_valid:true")) {
            String claimedId = params.get("openid.claimed_id")[0];
            return claimedId.substring(claimedId.lastIndexOf("/") + 1);
        }
        return null;
    }

    // get parsed games list
    public List<Map<String, Object>> getOwnedGamesAsList(String steamId) {
        JsonNode ownedGames = getOwnedGames(steamId);
        List<Map<String, Object>> result = new ArrayList<>();

        if (ownedGames != null) {
            JsonNode list = ownedGames.path("response").path("games");
            if (list.isArray()) {
                for (JsonNode g : list) {
                    Map<String, Object> map = new HashMap<>();
                    map.put("appid", g.get("appid").asInt());
                    map.put("name", g.get("name").asText());
                    result.add(map);
                }
            }
        }
        return result;
    }
}
