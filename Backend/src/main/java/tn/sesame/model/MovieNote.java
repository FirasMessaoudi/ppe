package tn.sesame.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class MovieNote {
    @EmbeddedId
    private MovieUserID movieUserID;
    private int note;
    private String section;
    private Boolean liked;
    private Boolean disliked;
}
