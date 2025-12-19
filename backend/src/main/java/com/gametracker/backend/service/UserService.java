package com.gametracker.backend.service;

import com.gametracker.backend.dto.user.UserCreationDTO;

import com.gametracker.backend.dto.user.UserSteamIdDTO;
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

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(); // TODO write exception here
    }

    public User createUser(UserCreationDTO dto) { // TODO probably write exception for this too
        User user = new User(null, dto.displayName());
        return userRepository.save(user);
    }

    public User editDisplayName(long id, UserCreationDTO dto) {
        User targetUser = userRepository.findById(id).orElseThrow(); // TODO write exception for this
        targetUser.setDisplayName(dto.displayName());
        return userRepository.save(targetUser);
    }

    public User editSteamConnection(long id, UserSteamIdDTO dto) {
        User targetUser = userRepository.findById(id).orElseThrow(); // TODO write exception for this
        targetUser.setSteamId(dto.steamId());
        return userRepository.save(targetUser);
    }

}
