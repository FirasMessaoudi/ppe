package tn.sesame.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.sesame.model.Comment;
import tn.sesame.service.CommentService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    @PostMapping("/addComment")
    public  Comment addComment(@RequestBody Comment comment){
         return commentService.saveComment(comment);
    }
    @PutMapping("/updateComment")
    public  void updateComment(@RequestBody Comment comment){
        commentService.saveComment(comment);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
    }
    @GetMapping("/findAll/{idMovie}")
    public List<Comment> findAll(@PathVariable String idMovie){
        return commentService.findByMovie(idMovie);
    }

    @GetMapping("/likedislike/{idComment}/{idUser}")
    public ResponseEntity<?> likeDislike(@PathVariable Long idComment, @PathVariable Integer idUser){
     return ResponseEntity.ok(commentService.likeDislike(idComment,idUser));
    }
}
