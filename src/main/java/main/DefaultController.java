package main;

import main.model.User;
import main.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
public class DefaultController {

    @Autowired
    UserRepository userRepository;

    @Value("${someParameter}")
    private Integer someParameter;

    @RequestMapping("/")
    public String index(Model model){
        Iterable<User> userIterable = userRepository.findAll();
        ArrayList<User> users = new ArrayList<>();
        for(User user : userIterable){
            users.add(user);
        }
        model.addAttribute("users", users);
        model.addAttribute("usersCount", users.size());
        model.addAttribute("someParameter", someParameter);
        return "index";
    }
}
