package com.CollegeHUB.quizEDU.flashcards.service;

import com.CollegeHUB.quizEDU.flashcards.repository.DeckRepo;
import com.CollegeHUB.quizEDU.flashcards.repository.FlashcardRepo;

public class FlashCardService {
    private final DeckRepo deckRepo;
    private final FlashcardRepo flashcardRepo;

    public FlashCardService(DeckRepo deckRepo, FlashcardRepo flashcardRepo) {
        this.deckRepo = deckRepo;
        this.flashcardRepo = flashcardRepo;
    }                                                                                                                                  A
}
