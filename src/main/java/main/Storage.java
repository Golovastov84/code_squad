package main;


import main.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class Storage {

    private static int currentId = 1;
    private static final ConcurrentHashMap<Integer, User> users = new ConcurrentHashMap<>();

    public static List<User> getAllUsers() {
        ArrayList<User> usersList = new ArrayList<>();
        usersList.addAll(users.values());
        return usersList;
    }

    public static int addUser(User user) {
//        int id = 0;
//        if(users.size() > 0){
//            for(User user1 : users.values()){
//                id = user1.getId();
//            }
//        }
//        currentId = id;
       int id = currentId++;
        user.setId(id);
        users.put(id, user);
        return id;
    }

    public static int setUser(User user) {
        int IdUser = user.getId();
        users.put(IdUser, user);
        return IdUser;
    }

    public static User getUser(int userId) {
        if (users.containsKey(userId)) {
            return users.get(userId);
        }
        return null;
    }

    public static int dellUser(int userId) {
        if (users.containsKey(userId)) {
            users.remove(userId);
            return userId;
        }
        return 0;
    }

    public static int dellAllUser() {
        users.clear();
        currentId = 1;
        return 0;
    }
}