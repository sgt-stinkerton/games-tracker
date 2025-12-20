package com.gametracker.backend;

import com.gametracker.backend.dto.library.LibraryCreationDTO;
import com.gametracker.backend.dto.library.ReviewCreationDTO;
import com.gametracker.backend.enums.Status;
import com.gametracker.backend.model.Game;
import com.gametracker.backend.model.Library;
import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.LibraryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;
import com.gametracker.backend.service.LibraryService;
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
    public CommandLineRunner commandLineRunner(UserRepository userRepository, GameRepository gameRepository, LibraryService libraryService, LibraryRepository libraryRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = userRepository.save(new User(null, "Estella Perkons"));
                Game game = gameRepository.save(new Game(null, "Metal Gear Solid V: The Phantom Pain", Year.now()));
                LibraryCreationDTO dto = new LibraryCreationDTO(user.getId(), game.getId(), Status.PLAYING, "Quiet! Put some clothes on!");
                Library newLibrary = new Library(user, game, dto.status(), dto.notes());
                libraryRepository.save(newLibrary);

                Game game2 = gameRepository.save(new Game(null, "Metal Gear Solid 3: Snake Eater", Year.now()));
                LibraryCreationDTO dto2 = new LibraryCreationDTO(user.getId(), game2.getId(), Status.COMPLETED, "Kept you waiting, huh?");
                Library newLibrary2 = new Library(user, game2, dto2.status(), dto2.notes());
                libraryRepository.save(newLibrary2);
                ReviewCreationDTO dto7 = new ReviewCreationDTO(null, "fuckin awesome!!!", LocalDate.now(), 10, 10, 10, 8, 7, 7);
                libraryService.createReview(newLibrary2.getId(), dto7);

                Game game3 = gameRepository.save(new Game(null, "Metal Gear Solid 2: Sons of Liberty", Year.now()));
                LibraryCreationDTO dto3 = new LibraryCreationDTO(user.getId(), game3.getId(), Status.DROPPED, "Raiden! Turn the games console off!");
                Library newLibrary3 = new Library(user, game3, dto3.status(), dto3.notes());
                libraryRepository.save(newLibrary3);
                ReviewCreationDTO dto4 = new ReviewCreationDTO(null, "fuckin shit.", LocalDate.now(), 10, 2, 3, 1, 0, 4);
                libraryService.createReview(newLibrary3.getId(), dto4);
            } else {
                System.out.println("Database already contains data. Skipping initial setup.");
            }
        };
    }

}
