package com.gymbot.model;

public class Week {
    private Integer weekNumber;
    private String startDate;
    private String endDate;
    private String goal;

    public Week() {
    }

    public Week(Integer weekNumber, String startDate, String endDate) {
        this.weekNumber = weekNumber;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Week(Integer weekNumber, String startDate, String endDate, String goal) {
        this.weekNumber = weekNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.goal = goal;
    }

    public Integer getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(Integer weekNumber) {
        this.weekNumber = weekNumber;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }
}
