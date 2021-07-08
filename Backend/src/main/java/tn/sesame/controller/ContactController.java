package tn.sesame.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.sesame.dto.ContactDTO;
import tn.sesame.service.ContactService;

import javax.print.DocFlavor;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("/contacts")
public class ContactController {
    private final ContactService contactService;
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    @PostMapping("/addMessage")
    @PreAuthorize("isAuthenticated()")
    public ContactDTO addMessage(@RequestBody ContactDTO contact){
        return contactService.addMessage(contact);
    }
}
