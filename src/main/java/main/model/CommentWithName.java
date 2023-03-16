package main.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

public class CommentWithName {

    private int idC;

    private String nameP;

    private String topicTextC;


    private String commentTimeC;


    private String commentTextC;

    private int ratingC;

    public CommentWithName() {
    }



    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }

    public String getNameP() {
        return nameP;
    }

    public void setNameP(String nameP) {
        this.nameP = nameP;
    }

    public String getTopicTextC() {
        return topicTextC;
    }

    public void setTopicTextC(String topicTextC) {
        this.topicTextC = topicTextC;
    }

    public String getCommentTimeC() {
        return commentTimeC;
    }

    public void setCommentTimeC(String commentTimeC) {
        this.commentTimeC = commentTimeC;
    }

    public String getCommentTextC() {
        return commentTextC;
    }

    public void setCommentTextC(String commentTextC) {
        this.commentTextC = commentTextC;
    }

    public int getRatingC() {
        return ratingC;
    }

    public void setRatingC(int ratingC) {
        this.ratingC = ratingC;
    }

    @Override
    public int hashCode(){
        return Objects.hash(idC, ratingC);
    }
}
