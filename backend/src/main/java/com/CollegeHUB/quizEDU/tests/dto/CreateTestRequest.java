package com.CollegeHUB.quizEDU.tests.dto;

import java.util.List;

public class CreateTestRequest {

    private String title;
    private String description;
    private String tag;
    private List<CreateQuestionRequest> questions;

    public CreateTestRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CreateQuestionRequest> getQuestions() {
        return questions;
    }

    public void setQuestions(List<CreateQuestionRequest> questions) {
        this.questions = questions;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
