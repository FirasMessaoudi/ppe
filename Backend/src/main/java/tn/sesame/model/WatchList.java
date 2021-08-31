package tn.sesame.model;

import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.*;

@Entity
@Data
public class WatchList {
    @EmbeddedId
    private MovieUserID movieUserID;
    private String section;
    private boolean watched;
    private int runtime;
    private int nbEpisodes;

}
