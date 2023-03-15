package main;


import main.model.Comment;
import main.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class Storage {

    private static int currentId = 1;
    
    private static int currentCommentId = 1;
    private static final ConcurrentHashMap<Integer, User> users = new ConcurrentHashMap<>();
    
    private static final ConcurrentHashMap<Integer, Comment> comments = new ConcurrentHashMap<>();

    public static List<User> getAllUsers() {
        ArrayList<User> usersList = new ArrayList<>();
        usersList.addAll(users.values());
        return usersList;
    }

    public static int addUser(User user) {
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
    
//    для game

    public static List<Comment> getAllComments() {
        ArrayList<Comment> commentsList = new ArrayList<>();
        commentsList.addAll(comments.values());
        return commentsList;
    }

    public static int addComment(Comment comment) {
        int id = currentCommentId++;
        comment.setId(id);
        comments.put(id, comment);
        return id;
    }

    public static int setComment(Comment comment) {
        int idComment = comment.getId();
        comments.put(idComment, comment);
        return idComment;
    }

    public static Comment getComment(int commentId) {
        if (comments.containsKey(commentId)) {
            return comments.get(commentId);
        }
        return null;
    }

    public static int dellComment(int commentId) {
        if (comments.containsKey(commentId)) {
            comments.remove(commentId);
            return commentId;
        }
        return 0;
    }

    public static int dellAllComment() {
        comments.clear();
        currentCommentId = 1;
        return 0;
    }
}