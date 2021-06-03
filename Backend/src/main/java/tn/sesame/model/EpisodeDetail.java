package tn.sesame.model;

import lombok.Data;

import java.util.List;

@Data
public class EpisodeDetail {
    private String air_date;
//    crew :MovieCrewModel[];
    private Integer episode_number;
    List<Guest> guest_stars;
    private String name;
    private String overview;
    private Integer production_code;
    private Integer id;
    private Integer season_number;
    private String still_path;
    private Double vote_average;
    private Integer vote_count;
    private String link;
}
