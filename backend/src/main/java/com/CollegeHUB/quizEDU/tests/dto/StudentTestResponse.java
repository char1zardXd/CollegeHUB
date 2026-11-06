package com.CollegeHUB.quizEDU.tests.dto;

import java.util.List;

public class StudentTestResponse {
    private Long id;
    private String title;
    private String description;
    private List<StudentQuestionDto> questions;

    // геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<StudentQuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<StudentQuestionDto> questions) { this.questions = questions; }

    public static class StudentQuestionDto {
        private Long id;
        private String text;
        private List<StudentOptionDto> options;

        // геттеры и сеттеры
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public List<StudentOptionDto> getOptions() { return options; }
        public void setOptions(List<StudentOptionDto> options) { this.options = options; }
    }

    public static class StudentOptionDto {
        private Long id;
        private String text;

        // геттеры и сеттеры
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}