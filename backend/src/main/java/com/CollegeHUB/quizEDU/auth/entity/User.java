package com.CollegeHUB.quizEDU.auth.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "phone_number", nullable = true)
    private String phoneNumber;

    @Column(name = "role", nullable = false)
    private String role = "STUDENT";

    @Column(name = "entry_time", nullable = false, updatable = false)
    private LocalDateTime entryTime;

    @Column(name = "user_group", nullable = true)
    private String group;

    @Column(name = "completed_tests_count", nullable = false)
    private int completedTestsCount = 0;

    @Column(name = "average_score_percentage", nullable = false)
    private double averageScorePercentage = 0.0;

    public User() {
    }

    public User(String email, String password, String fullName, String group) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.group = group;
    }

    @PrePersist
    protected void onCreate () {
        this.entryTime = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getEntryTime() { return entryTime; }

    public String getGroup() { return group; }
    public void setGroup(String group) { this.group = group; }

    public int getCompletedTestsCount() { return completedTestsCount; }
    public void setCompletedTestsCount(int completedTestsCount) { this.completedTestsCount = completedTestsCount; }

    public double getAverageScorePercentage() { return averageScorePercentage; }
    public void setAverageScorePercentage(double averageScorePercentage) { this.averageScorePercentage = averageScorePercentage; }

}