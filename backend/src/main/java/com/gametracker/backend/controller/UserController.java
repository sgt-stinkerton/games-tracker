package com.gametracker.backend.controller;

import com.gametracker.backend.dto.UserCreationDTO;
import com.gametracker.backend.dto.UserInfoDTO;
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

    @GetMapping({"/{id}"})
    public ResponseEntity<UserInfoDTO> getUser(@PathVariable long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(id).toDTO());
    }

    @PostMapping({"", "/"})
    public ResponseEntity<UserInfoDTO> createUser(@Valid @RequestBody UserCreationDTO dto) {
        User newUser = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser.toDTO());
    }

    @PatchMapping({"/{id}/edit"})
    public ResponseEntity<UserInfoDTO> editUser(@PathVariable long id, @Valid @RequestBody UserCreationDTO dto) {
        User updatedUser = userService.editUser(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser.toDTO());
    }
}
