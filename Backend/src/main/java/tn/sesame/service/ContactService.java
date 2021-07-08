package tn.sesame.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tn.sesame.dto.ContactDTO;
import tn.sesame.dto.mapper.ContactMapper;
import tn.sesame.model.User;
import tn.sesame.repository.ContactRepository;
import tn.sesame.repository.UserRepository;

@Service
public class ContactService {
    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;
    private final UserRepository userRepository;
    public ContactService(ContactRepository contactRepository, ContactMapper contactMapper, UserRepository userRepository) {
        this.contactRepository = contactRepository;
        this.contactMapper = contactMapper;
        this.userRepository = userRepository;
    }
    public ContactDTO addMessage(ContactDTO contact){
        try {
            Object auth = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (auth instanceof UserDetails) {

                String username =  ((UserDetails) auth).getUsername();
                User user = userRepository.findByUsername(username);
                contact.setUserId(user.getId());
                return contactMapper.toDto(contactRepository.save(contactMapper.toEntity(contact)));

            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
