package tn.sesame.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "utilisateur")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password,firstname,lastname;
    private boolean enabled;
    private Date lastPassowrdResetDate;
    private String picture;
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<Role> roles;
    @ManyToMany(mappedBy = "likedBy")
    @JsonIgnore
    List<Comment> likedComments;
    public User (){}


}
