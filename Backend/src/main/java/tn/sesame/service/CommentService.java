package tn.sesame.service;

import org.springframework.stereotype.Service;
import tn.sesame.model.Comment;
import tn.sesame.model.User;
import tn.sesame.repository.CommentRepository;
import tn.sesame.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    public Comment saveComment(Comment comment){
       return commentRepository.save(comment);
    }
    public void deleteComment(Long id){
        commentRepository.deleteById(id);
    }
    public List<Comment> findByMovie(String idMovie){
        return commentRepository.findByIdMovie(idMovie);
    }

    public Comment likeDislike(Long idComment, Integer idUser) {
        Optional<Comment> comment = commentRepository.findById(idComment);
        Optional<User> user = userRepository.findById(idUser);
        if(comment.isPresent() && user.isPresent()){
            if(comment.get().getLikedBy().contains(user.get())){
                //dislike
                comment.get().getLikedBy().remove(user.get());
                commentRepository.save(comment.get());
                return comment.get();

            }else {
                //like
                comment.get().getLikedBy().add(user.get());
                commentRepository.save(comment.get());
                return comment.get();

            }
        }
        return null;
    }
}
