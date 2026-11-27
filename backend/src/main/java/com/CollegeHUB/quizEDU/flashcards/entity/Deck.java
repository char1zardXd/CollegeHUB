package com.CollegeHUB.quizEDU.flashcards.entity;

import com.CollegeHUB.quizEDU.auth.entity.User;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "decks")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String topic;

    @Column(name = "max_flips", nullable = false)
    private int maxFlips;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FlashCard> cards = new ArrayList<>();

    public Deck() {
    }

    public void addCard(FlashCard card) {
        cards.add(card);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public int getMaxFlips() { return maxFlips; }
    public void setMaxFlips(int maxFlips) { this.maxFlips = maxFlips; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }

    public List<FlashCard> getCards() { return cards; }
    public void setCards(List<FlashCard> cards) { this.cards = cards; }
}