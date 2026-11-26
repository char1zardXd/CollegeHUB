package com.CollegeHUB.quizEDU.flashcards.dto;

import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.flashcards.entity.Flashcard;

import java.util.List;

public class CreateCardRequest {
    private String title;
    private String topic;
    private int maxFlips;
    private User author;
    private List<Flashcard> cards;
    private String frontText;
    private String frontSubText;
    private String answer;
    private String details;

    public CreateCardRequest() {
    }

    public String getTitle() {
        return title;
    }

    public String getTopic() {
        return topic;
    }

    public int getMaxFlips() {
        return maxFlips;
    }

    public User getAuthor() {
        return author;
    }

    public List<Flashcard> getCards() {
        return cards;
    }

    public String getFrontText() {
        return frontText;
    }

    public String getFrontSubText() {
        return frontSubText;
    }

    public String getAnswer() {
        return answer;
    }

    public String getDetails() {
        return details;
    }
}
