package com.gametracker.backend;

import com.gametracker.backend.dto.gameEntry.GameEntryCreationDTO;
import com.gametracker.backend.dto.gameEntry.ReviewCreationDTO;
import com.gametracker.backend.enums.Status;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.GameEntry;
import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.GameEntryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;
import com.gametracker.backend.service.GameEntryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, GameRepository gameRepository, GameEntryService gameEntryService, GameEntryRepository gameEntryRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = userRepository.save(new User(null, "Estella Perkons"));
                Game game = gameRepository.save(new Game(null, "Metal Gear Solid V: The Phantom Pain", LocalDate.now()));
                GameEntryCreationDTO dto = new GameEntryCreationDTO(user.getId(), game.getId(), Status.PLAYING, "Quiet! Put some clothes on!");
                GameEntry newGameEntry = new GameEntry(user, game, dto.status(), dto.notes());
                gameEntryRepository.save(newGameEntry);
                ReviewCreationDTO dto2 = new ReviewCreationDTO(null, "fuckin awesome", LocalDate.now(), 10, 10, 10, 8, 7, 7);
                gameEntryService.createReview(newGameEntry.getId(), dto2);
            } else {
                System.out.println("Database already contains data. Skipping initial setup.");
            }
        };
    }

}
