package com.gametracker.backend.service;

import com.gametracker.backend.dto.entry.EntryCreationDTO;
import com.gametracker.backend.dto.entry.ReviewCreationDTO;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.Entry;
import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.EntryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EntryService {
    private final EntryRepository entryRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public EntryService(EntryRepository entryRepository,
                        UserRepository userRepository,
                        GameRepository gameRepository) {
        this.entryRepository = entryRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    public List<Entry> getAll() {
        return entryRepository.findAll();
    }

    public Entry getById(Long id) {
        return entryRepository.findById(id).orElseThrow(); // TODO exception here
    }

    public Entry getByGameId(Long gameId) {
        return entryRepository.findByGameId(gameId).orElseThrow(); // TODO exception here
    }

    public Entry createEntry(EntryCreationDTO dto) {
        User user = userRepository.findById(dto.userId()).orElseThrow(); // TODO exception
        Game game = gameRepository.findById(dto.gameId()).orElseThrow(); // TODO exception
        Entry newEntry = new Entry(user, game, dto.status(), dto.notes());
        return entryRepository.save(newEntry);
    }

    public Entry createReview(long id, ReviewCreationDTO dto) {
        Entry targetEntry = entryRepository.findById(id).orElseThrow(); // TODO write exception for this

        targetEntry.setReviewText(dto.reviewText());
        targetEntry.setFinishDate(dto.finishDate());
        targetEntry.setRating(dto.rating());
        targetEntry.setEnjoyment(dto.enjoyment());
        targetEntry.setGameplay(dto.gameplay());
        targetEntry.setStory(dto.story());
        targetEntry.setVisuals(dto.visuals());
        targetEntry.setSound(dto.sound());

        return entryRepository.save(targetEntry);
    }

}
