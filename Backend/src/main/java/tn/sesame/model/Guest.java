package tn.sesame.model;

import lombok.Data;

@Data
public class Guest {
    private Integer   credit_id;
    private Integer  order;
    private Integer  gender;
    private Integer  id;
    private String character;
    private String  name;
    private String profile_path;
}
