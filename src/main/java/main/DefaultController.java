package main;

import main.model.Comment;
import main.model.CommentRepository;
import main.model.User;
import main.model.UserRepository;
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

        model.addAttribute("users", users);
        model.addAttribute("comments", comments);
        return "index";
    }
}
