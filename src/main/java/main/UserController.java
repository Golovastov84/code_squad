package main;

import main.model.Game;
import main.model.GameRepository;
import main.model.User;
import main.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    public UserController(UserRepository userRepository, GameRepository gameRepository) {
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    @GetMapping("/users")
    public List<User> ListUser() {
        Iterable<User> userIterable = userRepository.findAll();

        ArrayList<User> users = new ArrayList<>();
        for (User user : userIterable) {
            users.add(user);
        }
        return users;
    }

    @PostMapping("/users")
    public int addUser(User user) {
        if (userRepository.count() == 0) {
            user.setId(1);
        }
        boolean similarName = false;
        for(User userBase : userRepository.findAll()){
            if(userBase.getName().equals(user.getName())){
                similarName = true;
                break;
            }
        }
        if(similarName){
            return -1;
        } else {
//        User newUser = userRepository.save(putDeadline(user));
            User newUser = userRepository.save(user);

            return newUser.getId();
        }
    }

    @GetMapping("/users/{name}")
    public ResponseEntity<?> getUser(@PathVariable String name) {
        for(User userFind : userRepository.findAll()){
            if(userFind.getName().equals(name)){
                return new ResponseEntity<>(userFind, HttpStatus.OK);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> dellUser(@PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(userRepository.count(), HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> putUserId(User newUser, @PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
//        User modifiedUser = putDeadline(newUser);
        userRepository.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @DeleteMapping("/users")
    public ResponseEntity dellAllUsers() {
        if (userRepository.count() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The list is already empty.");
        }
        userRepository.deleteAll();
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

//    для game

    @GetMapping("/games")
    public List<Game> ListGame() {
        Iterable<Game> gameIterable = gameRepository.findAll();

        ArrayList<Game> games = new ArrayList<>();
        for (Game game : gameIterable) {
            games.add(game);
        }
        return games;
    }

    @PostMapping("/games")
    public int addGame(Game game) {
        if (gameRepository.count() == 0) {
            game.setId(1);
        }
        Game newGame = gameRepository.save(game);
        return newGame.getId();
    }

    @GetMapping("/games/{id}")
    public ResponseEntity<?> getGame(@PathVariable int id) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (!optionalGame.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(optionalGame.get(), HttpStatus.OK);
    }

    @DeleteMapping("/games/{id}")
    public ResponseEntity<?> dellGame(@PathVariable int id) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (!optionalGame.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        gameRepository.deleteById(id);
        return new ResponseEntity<>(gameRepository.count(), HttpStatus.OK);
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<?> putGameId(Game newGame, @PathVariable int id) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (!optionalGame.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        gameRepository.save(newGame);
        return new ResponseEntity<>(newGame, HttpStatus.OK);
    }

    @DeleteMapping("/games")
    public ResponseEntity dellAllGames() {
        if (gameRepository.count() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The list is already empty.");
        }
        gameRepository.deleteAll();
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
