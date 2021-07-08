package tn.sesame.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data // lombok annotation to implement getters , setters n constructors ...
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String subject,message,response;
    private Date dateMessage;
    @ManyToOne
    private User user;
}
