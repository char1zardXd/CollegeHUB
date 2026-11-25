package com.CollegeHUB.quizEDU.flashcards.repository;

import com.CollegeHUB.quizEDU.flashcards.entity.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashcardRepo extends JpaRepository<Flashcard, Long> {
}