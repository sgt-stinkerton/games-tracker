package com.gametracker.backend.service;

import com.gametracker.backend.dto.library.LibraryCreationDTO;
import com.gametracker.backend.dto.library.ReviewCreationDTO;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.Library;
import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.LibraryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LibraryService {
    private final LibraryRepository libraryRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public LibraryService(LibraryRepository libraryRepository,
                          UserRepository userRepository,
                          GameRepository gameRepository) {
        this.libraryRepository = libraryRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    public List<Library> getAll() {
        return libraryRepository.findAll();
    }

    public Library getById(Long id) {
        return libraryRepository.findById(id).orElseThrow(); // TODO exception here
    }

    public Library createEntry(LibraryCreationDTO dto) {
        User user = userRepository.findById(dto.userId()).orElseThrow(); // TODO exception
        Game game = gameRepository.findById(dto.gameId()).orElseThrow(); // TODO exception
        Library newLibrary = new Library(user, game, dto.status(), dto.notes());
        return libraryRepository.save(newLibrary);
    }

    public Library createReview(long id, ReviewCreationDTO dto) {
        Library targetEntry = libraryRepository.findById(id).orElseThrow(); // TODO write exception for this

        targetEntry.setFullAchievements(dto.fullAchievements());
        targetEntry.setReviewText(dto.reviewText());
        targetEntry.setFinishDate(dto.finishDate());
        targetEntry.setRating(dto.rating());
        targetEntry.setEnjoyment(dto.enjoyment());
        targetEntry.setGameplay(dto.gameplay());
        targetEntry.setStory(dto.story());
        targetEntry.setVisuals(dto.visuals());
        targetEntry.setSound(dto.sound());

        return libraryRepository.save(targetEntry);
    }

}
