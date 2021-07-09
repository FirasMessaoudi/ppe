package tn.sesame;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import tn.sesame.model.Role;
import tn.sesame.model.User;
import tn.sesame.repository.UserRepository;
import tn.sesame.service.UserService;

import java.util.Arrays;
import java.util.Optional;


@SpringBootApplication
public class MoviesApplication implements CommandLineRunner {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    public static void main(String[] args) {
        SpringApplication.run(MoviesApplication.class, args);
    }
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Override
    public void run(String... args) throws Exception {
        Optional<User> userOp = userRepository.findByUsernameAndEmail("admin","admin@movies.com");
        if(!userOp.isPresent()) {
            User user = new User();
            user.setFirstname("admin");
            user.setUsername("admin");
            user.setEmail("admin@movies.com");
            user.setEnabled(true);
            user.setRoles(Arrays.asList(Role.ROLE_ADMIN, Role.ROLE_USER));
            user.setPassword("admin");
            userService.signup(user);
        }

    }
}
