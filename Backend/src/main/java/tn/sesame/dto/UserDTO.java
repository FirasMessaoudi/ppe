package tn.sesame.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import tn.sesame.model.Role;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class UserDTO {
    private Integer id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    private String password;
    private String firstname,lastname;
    private boolean enabled;
    @JsonIgnore
    private Date lastPassowrdResetDate;
    private String picture;
    @Enumerated(EnumType.STRING)
    private List<Role> roles;

}

