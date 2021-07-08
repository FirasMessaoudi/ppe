package tn.sesame.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ContactDTO {
    private Long id;
    private String subject,message,response;
    private Date dateMessage;
    private Integer userId;
    private String email;
}




