package tn.sesame.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.sesame.dto.UserDTO;
import tn.sesame.dto.UserDTO;
import tn.sesame.dto.UserUpdate;
import tn.sesame.dto.mapper.UserMapper;
import tn.sesame.model.User;
import tn.sesame.model.User;
import tn.sesame.repository.UserRepository;
import tn.sesame.service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;
    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public UserDTO getUser(@PathVariable("username") String username){
        return userMapper.toDto(userRepository.findByUsername(username));
    }
    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdate userUpdate){
        return userService.update(userUpdate);
    }
    
    @GetMapping("/findAll")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> findAll(){
        return ResponseEntity.ok(userstoDto(userRepository.findAll()));
    }

    private List<UserDTO> userstoDto(List<User> users){
        if ( users == null ) {
            return null;
        }

        List<UserDTO> list = new ArrayList<UserDTO>();

        for ( User user : users ) {
            list.add( userMapper.toDto( user ) );
        }

        return list;
    }
}
