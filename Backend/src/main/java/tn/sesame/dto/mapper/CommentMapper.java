package tn.sesame.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import tn.sesame.dto.CommentDTO;
import tn.sesame.model.Comment;

@Mapper(componentModel = "spring",uses = {UserMapper.class})
public interface CommentMapper {
    @Mappings({

            @Mapping(source="user.id" , target ="userId"),
            @Mapping(source = "user.username", target = "username")
    })
    CommentDTO toDto(Comment comment);
    @Mappings({
            //if you have attributes to map do it here (dto ---> toentity)
            @Mapping(source="userId" , target ="user.id"),
            @Mapping(source="username" , target ="user.username")


    })
    Comment toEntity(CommentDTO commentDTO);
    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment generated = new Comment();
        generated.setId(id);
        return generated;
    }
}
