package com.gametracker.backend.service;

import com.gametracker.backend.dto.UserCreationDTO;

import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // gets user information
    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(); // TODO write exception here
    }

    // creates new user record
    public User createUser(UserCreationDTO dto) { // TODO probably write exception for this too
        User user = new User(dto.steamId(), dto.displayName());
        return userRepository.save(user);
    }

    // updates user information
    public User editUser(long id, UserCreationDTO dto) {
        User targetUser = userRepository.findById(id).orElseThrow(); // TODO write exception for this
        targetUser.setSteamId(dto.steamId());
        targetUser.setDisplayName(dto.displayName());
        return userRepository.save(targetUser);
    }

}
