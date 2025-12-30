package com.gymbot.model;

import com.fasterxml.jackson.annotation.JsonSetter;

public class Exercise {
    private String id;
    private String name;
    private Integer maxReps;
    private Week week;
    private String category; // "PUSH", "PULL", or "LEG"

    public Exercise() {
    }

    // Backward compatibility: Handle old weekNumber field
    @JsonSetter("weekNumber")
    public void setWeekNumber(Integer weekNumber) {
        if (weekNumber != null) {
            this.week = new Week();
            this.week.setWeekNumber(weekNumber);
        }
    }

    public Exercise(String name, Integer maxReps, Week week, String category) {
        this.name = name;
        this.maxReps = maxReps;
        this.week = week;
        this.category = category;
    }

    public Exercise(String id, String name, Integer maxReps, Week week, String category) {
        this.id = id;
        this.name = name;
        this.maxReps = maxReps;
        this.week = week;
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

    public Week getWeek() {
        return week;
    }

    public void setWeek(Week week) {
        this.week = week;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
