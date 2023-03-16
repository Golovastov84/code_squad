package main;

import main.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

@Controller
public class DefaultController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

    @RequestMapping("/")
    public String index(Model model){
        Iterable<User> userIterable = userRepository.findAll();
        ArrayList<User> users = new ArrayList<>();
        for(User user : userIterable){
            users.add(user);
        }
        Iterable<Comment> commentIterable = commentRepository.findAll();
        ArrayList<Comment> comments = new ArrayList<>();
        for(Comment comment : commentIterable){
            comments.add(comment);
        }

        Collections.sort(comments,
                Comparator.comparing(Comment::getRating, Comparator.reverseOrder()).thenComparing(Comment::getId,
                        Comparator.reverseOrder()));

        ArrayList<CommentWithName> commentsWNames = new ArrayList<>();
        for(Comment comment : commentIterable){
            CommentWithName commentWithName = new CommentWithName();
            commentWithName.setIdC(comment.getId());
            for(User user : users){
               if(comment.getIdName() == user.getId()){
                   commentWithName.setNameP(user.getName());
               }
            }

            commentWithName.setTopicTextC(comment.getTopicText());
            commentWithName.setCommentTimeC(comment.getCommentTime());
            commentWithName.setCommentTextC(comment.getCommentText());
            commentWithName.setRatingC(comment.getRating());
            commentsWNames.add(commentWithName);
        }

        Collections.sort(commentsWNames,
                Comparator.comparing(CommentWithName::getRatingC, Comparator.reverseOrder()).thenComparing(CommentWithName::getIdC,
                        Comparator.reverseOrder()));

        model.addAttribute("users", users);
        model.addAttribute("comments", comments);
        model.addAttribute("commentsWNames", commentsWNames);
        return "index";
    }
}
