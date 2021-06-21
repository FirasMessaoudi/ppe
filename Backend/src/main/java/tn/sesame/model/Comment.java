package tn.sesame.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String idMovie;
    private String comment;
    private Integer likes;
    private Date commentDate;
    @ManyToOne
    private User user;
    @ManyToMany()
    List<User> likedBy;
}
