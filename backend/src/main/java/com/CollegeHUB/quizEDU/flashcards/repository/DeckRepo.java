package com.CollegeHUB.quizEDU.flashcards.repository;

import com.CollegeHUB.quizEDU.flashcards.entity.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeckRepo extends JpaRepository<Deck, Long> {
}