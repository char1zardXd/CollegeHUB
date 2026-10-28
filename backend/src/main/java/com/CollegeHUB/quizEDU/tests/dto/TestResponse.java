package com.CollegeHUB.quizEDU.tests.dto;

public class TestResponse {
    private Long id;
    private String author;
    private String title;
    private String description;
    private String tag;
    private int totalQuestions;

    public TestResponse(Long id, String author, String title, String description, String tag, int totalQuestions) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.description = description;
        this.tag = tag;
        this.totalQuestions = totalQuestions;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
}