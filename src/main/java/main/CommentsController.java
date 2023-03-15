package main;

import main.model.Comment;
import main.model.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class CommentsController {


    @Autowired
    private CommentRepository commentRepository;

    public CommentsController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    @GetMapping("/comments")
    public List<Comment> ListComments() {
        Iterable<Comment> gameIterable = commentRepository.findAll();
        ArrayList<Comment> comments = new ArrayList<>();
        
        for (Comment comment : gameIterable) {
            comments.add(comment);
        }
        Collections.sort(comments, Comparator.comparing(Comment::getRating).thenComparing(Comment::getId));
        return comments;
    }

    @PostMapping("/comments")
    public int addGame(Comment comment) {
        if (commentRepository.count() == 0) {
            comment.setId(1);
        }
        Comment newComment = commentRepository.save(comment);
        return newComment.getId();
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getComment(@PathVariable int id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (!optionalComment.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(optionalComment.get(), HttpStatus.OK);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<?> dellComment(@PathVariable int id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (!optionalComment.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        commentRepository.deleteById(id);
        return new ResponseEntity<>(commentRepository.count(), HttpStatus.OK);
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<?> putCommentsId(Comment newComment, @PathVariable int id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (!optionalComment.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        commentRepository.save(newComment);
        return new ResponseEntity<>(newComment, HttpStatus.OK);
    }

    @DeleteMapping("/comments")
    public ResponseEntity dellAllComments() {
        if (commentRepository.count() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The list is already empty.");
        }
        commentRepository.deleteAll();
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
