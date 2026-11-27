package com.CollegeHUB.quizEDU.flashcards.dto;

public class FlashCardResponseDto {
    private Long id;
    private String frontText;
    private String frontSubText;
    private String answer;
    private String detail;

    public FlashCardResponseDto(Long id, String frontText, String frontSubText, String answer, String detail) {
        this.id = id;
        this.frontText = frontText;
        this.frontSubText = frontSubText;
        this.answer = answer;
        this.detail = detail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFrontText() {
        return frontText;
    }

    public void setFrontText(String frontText) {
        this.frontText = frontText;
    }

    public String getFrontSubText() {
        return frontSubText;
    }

    public void setFrontSubText(String frontSubText) {
        this.frontSubText = frontSubText;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
