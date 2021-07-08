package tn.sesame.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import tn.sesame.dto.ContactDTO;
import tn.sesame.model.Contact;

@Mapper(componentModel = "spring",uses = {UserMapper.class})
public interface ContactMapper {
    @Mappings({

            @Mapping(source="user.id" , target ="userId"),
            @Mapping(source="user.email" , target ="email")

    })
    ContactDTO toDto(Contact contact);
    @Mappings({
            //if you have attributes to map do it here (dto ---> toentity)
            //@Mapping(source="attributefrom dto , target ="attribute from entity")
            @Mapping(source="userId" , target ="user")

    })
    Contact toEntity(ContactDTO contactDTO);
    default Contact fromId(Long id) {
        if (id == null) {
            return null;
        }
        Contact generated = new Contact();
        generated.setId(id);
        return generated;
    }
}
