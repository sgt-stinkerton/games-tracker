package com.gametracker.backend.controller;

import com.gametracker.backend.dto.user.UserCreationDTO;
import com.gametracker.backend.dto.user.UserInfoDTO;
import com.gametracker.backend.dto.user.UserSteamIdDTO;
import com.gametracker.backend.model.User;
import com.gametracker.backend.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * get user information by their id
     * @return DTO containing user info
     */
    @GetMapping({"", "/"})
    public ResponseEntity<UserInfoDTO> getUser() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(1L).toDTO());
    }

    /**
     * creating a new user
     * @param dto creation DTO (only creates display name)
     * @return DTO containing new user's info
     */
    @PostMapping({"", "/"})
    public ResponseEntity<UserInfoDTO> createUser(@Valid @RequestBody UserCreationDTO dto) {
        User newUser = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser.toDTO());
    }

    /**
     * edit the display name of the user
     * @param dto creation DTO (only creates display name)
     * @return DTO containing user info
     */
    @PatchMapping({"/edit/name"})
    public ResponseEntity<UserInfoDTO> editDisplayName(@Valid @RequestBody UserCreationDTO dto) {
        User updatedUser = userService.editDisplayName(1L, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser.toDTO());
    }

    /**
     * edit the user's steam connection
     * @param dto steam ID editing DTO
     * @return DTO containing user info
     */
    @PatchMapping({"/edit/steam"})
    public ResponseEntity<UserInfoDTO> editSteamConnection(@Valid @RequestBody UserSteamIdDTO dto) {
        User updatedUser = userService.editSteamConnection(1L, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser.toDTO());
    }
}
