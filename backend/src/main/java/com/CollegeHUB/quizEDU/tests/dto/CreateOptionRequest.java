package com.CollegeHUB.quizEDU.tests.dto;

public class CreateOptionRequest {

    private String text;
    private boolean isCorrect;

    public CreateOptionRequest() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
