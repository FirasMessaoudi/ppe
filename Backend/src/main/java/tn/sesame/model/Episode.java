package tn.sesame.model;

import lombok.Data;

@Data
public class Episode {
    private String air_date;
    private Integer episode_number;
    private Integer id;
    private String name;
    private String overview;
    private String production_code;
    private Integer season_number;
    private Integer show_id;
    private String still_path;
    private Double vote_average;
    private Integer vote_count;
}
