package tn.sesame.dto;

import lombok.Data;
import tn.sesame.model.User;

import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.List;

@Data
public class CommentDTO {
    private Long id;
    private String idMovie;
    private String comment;
    private Integer likes;
    private Date commentDate;
    private Integer userId;
    private String username;
    List<UserDTO> likedBy;

}
