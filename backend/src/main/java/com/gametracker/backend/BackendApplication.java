package com.gametracker.backend;

import com.gametracker.backend.model.User;
import com.gametracker.backend.repository.EntryRepository;
import com.gametracker.backend.repository.GameRepository;
import com.gametracker.backend.repository.UserRepository;
import com.gametracker.backend.service.EntryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
            } else {
                System.out.println("Database already contains data. Skipping initial setup.");
            }
        };
    }

}
