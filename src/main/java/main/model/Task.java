/*
package main.java.main.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String header;

    private String description;

    private int yearTask;

    private int monthTask;

    private int dayTask;

    private LocalDate deadline;

    public Task() {
    }

    public Task(int yearTask, int monthTask, int dayTask) {
        deadline = LocalDate.of(yearTask, monthTask, dayTask);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline() {

        return deadline;
    }

    public void setDeadline(int yearTask, int monthTask, int dayTask) {
        this.deadline = LocalDate.of(yearTask, monthTask, dayTask);
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public int getYearTask() {
        return yearTask;
    }

    public void setYearTask(int yearTask) {
        this.yearTask = yearTask;
    }

    public int getMonthTask() {
        return monthTask;
    }

    public void setMonthTask(int monthTask) {
        this.monthTask = monthTask;
    }

    public int getDayTask() {
        return dayTask;
    }

    public void setDayTask(int dayTask) {
        this.dayTask = dayTask;
    }
}
*/
