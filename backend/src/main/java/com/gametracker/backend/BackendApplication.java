package com.gametracker.backend;

import com.gametracker.backend.dto.entry.EntryCreationDTO;
import com.gametracker.backend.dto.entry.ReviewCreationDTO;
import com.gametracker.backend.enums.Status;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.Entry;
import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.EntryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;
import com.gametracker.backend.service.EntryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.Year;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, GameRepository gameRepository, EntryService entryService, EntryRepository entryRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = userRepository.save(new User(null, "Estella Perkons"));
                Game game = gameRepository.save(new Game(null, "Metal Gear Solid V: The Phantom Pain", Year.now()));
                EntryCreationDTO dto = new EntryCreationDTO(user.getId(), game.getId(), Status.PLAYING, "Quiet! Put some clothes on!");
                Entry newEntry = new Entry(user, game, dto.status(), dto.notes());
                entryRepository.save(newEntry);

                Game game2 = gameRepository.save(new Game(null, "Metal Gear Solid 3: Snake Eater", Year.now()));
                EntryCreationDTO dto2 = new EntryCreationDTO(user.getId(), game2.getId(), Status.COMPLETED, "Kept you waiting, huh?");
                Entry newEntry2 = new Entry(user, game2, dto2.status(), dto2.notes());
                entryRepository.save(newEntry2);
                ReviewCreationDTO dto7 = new ReviewCreationDTO(null, "fuckin awesome!!!", LocalDate.now(), 10, 10, 10, 8, 7, 7);
                entryService.createReview(newEntry2.getId(), dto7);

                Game game3 = gameRepository.save(new Game(null, "Metal Gear Solid 2: Sons of Liberty", Year.now()));
                EntryCreationDTO dto3 = new EntryCreationDTO(user.getId(), game3.getId(), Status.DROPPED, "Raiden! Turn the games console off!");
                Entry newEntry3 = new Entry(user, game3, dto3.status(), dto3.notes());
                entryRepository.save(newEntry3);
                ReviewCreationDTO dto4 = new ReviewCreationDTO(null, "fuckin shit.", LocalDate.now(), 10, 2, 3, 1, 0, 4);
                entryService.createReview(newEntry3.getId(), dto4);

                Game game4 = gameRepository.save(new Game(null, "Metal Gear Solid 4: Guns of the Patriots", Year.now()));
                EntryCreationDTO dto5 = new EntryCreationDTO(user.getId(), game4.getId(), Status.TO_PLAY, "");
                Entry newEntry4 = new Entry(user, game4, dto5.status(), dto5.notes());
                entryRepository.save(newEntry4);

                Game game5 = gameRepository.save(new Game(null, "Metal Gear Solid", Year.now()));
                EntryCreationDTO dto6 = new EntryCreationDTO(user.getId(), game5.getId(), Status.UP_NEXT, "");
                Entry newEntry5 = new Entry(user, game5, dto6.status(), dto6.notes());
                entryRepository.save(newEntry5);

                Game game6 = gameRepository.save(new Game(null, "Among Us", Year.now()));
                EntryCreationDTO dto8 = new EntryCreationDTO(user.getId(), game6.getId(), Status.HIDDEN, "");
                Entry newEntry6 = new Entry(user, game6, dto8.status(), dto8.notes());
                entryRepository.save(newEntry6);

            } else {
                System.out.println("Database already contains data. Skipping initial setup.");
            }
        };
    }

}
