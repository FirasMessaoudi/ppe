package tn.sesame.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.sesame.dto.UserUpdate;
import tn.sesame.model.User;
import tn.sesame.repository.MovieNoteRepository;
import tn.sesame.repository.UserRepository;
import tn.sesame.service.UserService;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return userRepository.findByUsername(username);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdate userUpdate){
        return userService.update(userUpdate);
    }
}
