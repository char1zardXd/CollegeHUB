package com.CollegeHUB.quizEDU.flashcards.dto;

import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.flashcards.entity.Flashcard;

import java.util.List;

public class CreateCardResponse {
    private String title;
    private String topic;
    private int maxFlips;
    private User author;
    private List<Flashcard> cards;
    private String frontText;
    private String frontSubText;
    private String answer;
    private String details;

    public CreateCardResponse(String title, String topic, int maxFlips, User author, List<Flashcard> cards, String frontText, String frontSubText, String answer, String details) {
        this.title = title;
        this.topic = topic;
        this.maxFlips = maxFlips;
        this.author = author;
        this.cards = cards;
        this.frontText = frontText;
        this.frontSubText = frontSubText;
        this.answer = answer;
        this.details = details;
    }

    public String getTitle() {

        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getMaxFlips() {
        return maxFlips;
    }

    public void setMaxFlips(int maxFlips) {
        this.maxFlips = maxFlips;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public List<Flashcard> getCards() {
        return cards;
    }

    public void setCards(List<Flashcard> cards) {
        this.cards = cards;
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

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
