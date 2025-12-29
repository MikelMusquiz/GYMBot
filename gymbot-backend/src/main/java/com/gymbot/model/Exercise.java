package com.gymbot.model;

public class Exercise {
    private String id;
    private String name;
    private Integer maxReps;
    private Integer weekNumber;
    private String category; // "PUSH", "PULL", or "LEG"

    public Exercise() {
    }

    public Exercise(String name, Integer maxReps, Integer weekNumber, String category) {
        this.name = name;
        this.maxReps = maxReps;
        this.weekNumber = weekNumber;
        this.category = category;
    }

    public Exercise(String id, String name, Integer maxReps, Integer weekNumber, String category) {
        this.id = id;
        this.name = name;
        this.maxReps = maxReps;
        this.weekNumber = weekNumber;
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMaxReps() {
        return maxReps;
    }

    public void setMaxReps(Integer maxReps) {
        this.maxReps = maxReps;
    }

    public Integer getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(Integer weekNumber) {
        this.weekNumber = weekNumber;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
