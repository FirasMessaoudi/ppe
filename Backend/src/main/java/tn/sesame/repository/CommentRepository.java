package tn.sesame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.sesame.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByIdMovie(String idMovie);
}
