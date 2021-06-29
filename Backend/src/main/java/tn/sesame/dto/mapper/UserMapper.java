package tn.sesame.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import tn.sesame.dto.UserDTO;
import tn.sesame.model.User;

@Mapper(componentModel = "spring",uses = {})
public interface UserMapper {
    @Mappings({

            //@Mapping(source="attributefrom entity , target ="attribute from dto")
    })
    UserDTO toDto(User user);
    @Mappings({
            //if you have attributes to map do it here (dto ---> toentity)
            //@Mapping(source="attributefrom dto , target ="attribute from entity")

    })
    User toEntity(UserDTO userDTO);
    default User fromId(Integer id) {
        if (id == null) {
            return null;
        }
        User generated = new User();
        generated.setId(id);
        return generated;
    }
}
