package tn.sesame.dto;

import lombok.Data;
import tn.sesame.model.Role;
import java.util.List;

@Data
public class UserUpdate {
    private Integer id;
    private String firstname;
    private String password;
    private String username;
    private String newUsername;
    private String email;
    private String newEmail;
    private String picture;
    private List<Role> roles;
}
