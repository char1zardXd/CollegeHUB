package com.CollegeHUB.quizEDU.flashcards.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "flashcards")
public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "front_text", nullable = false)
    private String frontText;

    @Column(name = "front_subtext", nullable = true)
    private String frontSubtext;

    @Column(nullable = false)
    private String answer;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String details;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id", nullable = false)
    private Deck deck;

    public Flashcard() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFrontText() { return frontText; }
    public void setFrontText(String frontText) { this.frontText = frontText; }

    public String getFrontSubtext() { return frontSubtext; }
    public void setFrontSubtext(String frontSubtext) { this.frontSubtext = frontSubtext; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Deck getDeck() { return deck; }
    public void setDeck(Deck deck) { this.deck = deck; }
}