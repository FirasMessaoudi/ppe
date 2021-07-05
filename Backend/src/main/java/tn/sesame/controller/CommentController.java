package tn.sesame.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.sesame.dto.CommentDTO;
import tn.sesame.dto.mapper.CommentMapper;
import tn.sesame.model.Comment;
import tn.sesame.service.CommentService;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/addComment")
    public CommentDTO addComment(@RequestBody CommentDTO comment){
        Comment cm =commentService.saveComment(commentMapper.toEntity(comment));
         return commentMapper.toDto(cm);
    }
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/updateComment")
    public  void updateComment(@RequestBody CommentDTO comment){
        commentService.saveComment(commentMapper.toEntity(comment))  ;
    }
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/delete/{id}")
    public void deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
    }
    @GetMapping("/findAll/{idMovie}")
    public List<CommentDTO> findAll(@PathVariable String idMovie){
        return commentstoDto(commentService.findByMovie(idMovie));
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/likedislike/{idComment}/{idUser}")
    public ResponseEntity<?> likeDislike(@PathVariable Long idComment, @PathVariable Integer idUser){
     return ResponseEntity.ok(commentService.likeDislike(idComment,idUser));
    }
    private List<CommentDTO> commentstoDto(List<Comment> comments){
        if ( comments == null ) {
            return null;
        }

        List<CommentDTO> list = new ArrayList<CommentDTO>();

        for ( Comment comment : comments ) {
            list.add( commentMapper.toDto( comment ) );
        }

        return list;
    }
  }