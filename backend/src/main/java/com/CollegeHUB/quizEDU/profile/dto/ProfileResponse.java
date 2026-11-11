package com.CollegeHUB.quizEDU.profile.dto;

import java.time.LocalDateTime;

public class ProfileResponse {
    private String email;
    private String fullName;
    private String group;
    private LocalDateTime entryTime;
    private long completedTestsCount;
    private long score;
    private double averageScorePercentage;
    private long perfectTestsCount;

    public ProfileResponse(String email, String fullName, String group, LocalDateTime entryTime, long completedTestsCount, long score, double averageScorePercentage, long perfectTestsCount) {
        this.email = email;
        this.fullName = fullName;
        this.group = group;
        this.entryTime = entryTime;
        this.completedTestsCount = completedTestsCount;
        this.score = score;
        this.averageScorePercentage = averageScorePercentage;
        this.perfectTestsCount = perfectTestsCount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public long getCompletedTestsCount() {
        return completedTestsCount;
    }

    public void setCompletedTestsCount(int completedTestsCount) {
        this.completedTestsCount = completedTestsCount;
    }

    public long getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public double getAverageScorePercentage() {
        return averageScorePercentage;
    }

    public void setAverageScorePercentage(double averageScorePercentage) {
        this.averageScorePercentage = averageScorePercentage;
    }

    public long getPerfectTestsCount() {
        return perfectTestsCount;
    }

    public void setPerfectTestsCount(int perfectTestsCount) {
        this.perfectTestsCount = perfectTestsCount;
    }
}
