package tn.sesame.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.sesame.dto.AuthToken;
import tn.sesame.dto.JwtResponse;
import tn.sesame.dto.UserUpdate;
import tn.sesame.exception.CustomException;
import tn.sesame.model.User;
import tn.sesame.repository.UserRepository;
import tn.sesame.security.JwtTokenProvider;

import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  @Autowired
  private AuthenticationManager authenticationManager;

  public ResponseEntity<?> signin(String username, String password) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
      String token= jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRoles());
      //return new JwtResponse(token,username,userRepository.findByUsername(username).getRoles());
      return ResponseEntity.ok(new AuthToken(token));
    } catch (AuthenticationException e) {
      throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  public JwtResponse signup(User user) {
    if (!userRepository.existsByUsername(user.getUsername())) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      userRepository.save(user);
      return new JwtResponse(jwtTokenProvider.createToken(user.getUsername(), user.getRoles()),user.getUsername(),user.getRoles());
    } else {
      throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

 public List<User> findAll() {
return userRepository.findAll();
  }

  public User search(String username) {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public User whoami(HttpServletRequest req) {
    return userRepository.findByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
  }
  public ResponseEntity<?> update(UserUpdate userUpdate){
        User oldUser = userRepository.findById(userUpdate.getId()).get();
        if(!checkEmail(userUpdate.getEmail(),userUpdate.getNewEmail())) {
          throw new CustomException("Email is already in use", HttpStatus.IM_USED);
        }
        if(!checkUsername(userUpdate.getUsername(),userUpdate.getNewUsername())){
          throw new CustomException("Username is already in use", HttpStatus.IM_USED);
        }
        if(!passwordEncoder.matches(userUpdate.getOldPassword(),oldUser.getPassword())){
            throw new CustomException("Wrong password", HttpStatus.IM_USED);
        }
        User user = new User();
        user.setId(userUpdate.getId());
        user.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
        user.setEmail(userUpdate.getNewEmail());
        user.setUsername(userUpdate.getNewUsername());
        user.setEnabled(true);
        user.setFirstname(userUpdate.getFirstname());
        user.setPicture(userUpdate.getPicture());
        user.setRoles(userUpdate.getRoles());
        return  ResponseEntity.ok(userRepository.save(user));

  }

  private boolean checkEmail(String oldEmail,String newEmail){
    if(oldEmail.equals(newEmail)){
      return true;
    }
    if(userRepository.existsByEmail(newEmail)){
      return false;
    }
    return true;
  }
  private boolean checkUsername(String oldUsername,String newUsername){
    if(oldUsername.equals(newUsername)){
      return true;
    }
    if(userRepository.existsByUsername(newUsername)){
      return false;
    }
    return true;
  }
}
