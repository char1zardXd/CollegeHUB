package com.CollegeHUB.quizEDU.flashcards.service;

import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.auth.repo.UsersRepo;
import com.CollegeHUB.quizEDU.flashcards.dto.*;
import com.CollegeHUB.quizEDU.flashcards.entity.Deck;
import com.CollegeHUB.quizEDU.flashcards.entity.FlashCard;
import com.CollegeHUB.quizEDU.flashcards.repository.DeckRepo;
import com.CollegeHUB.quizEDU.flashcards.repository.FlashcardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RequiredArgsConstructor
@Service
public class FlashCardService {
    private final DeckRepo deckRepo;
    private final FlashcardRepo flashcardRepo;
    private final UsersRepo usersRepo;

    @Transactional
    public DecksResponseDto createNewDecks(DecksRequestDto request, Long userId) {
        User author = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("not found"));

        Deck deck = new Deck();
        deck.setAuthor(author);
        deck.setTitle(request.getTitle());
        deck.setTopic(request.getTopic());
        deck.setMaxFlips(request.getMaxFlips());

        if(request.getCards() != null) {
            for(FlashCardRequestDto flashCardDto : request.getCards()) {
                FlashCard flashCard = new FlashCard();
                flashCard.setFrontText(flashCardDto.getFrontText());
                flashCard.setFrontSubtext(flashCardDto.getFrontSubText());
                flashCard.setAnswer(flashCardDto.getAnswer());
                flashCard.setDetails(flashCardDto.getDetail());

                deck.addCard(flashCard);
            }
        }

        Deck savedDeck = deckRepo.save(deck);

        return mapToDto(savedDeck);
    }

    @Transactional(readOnly = true)
    public List<DecksResponseDto> getAllDecks() {
        return deckRepo.findAll().stream()
                .map(deck -> mapToDto(deck))
                .toList();
    }

    private DecksResponseDto mapToDto(Deck deck) {
        List<FlashCardResponseDto> deckDto = deck.getCards().stream()
                .map(f -> {
                    FlashCardResponseDto flashCard = new FlashCardResponseDto(
                            f.getId(),
                            f.getFrontText(),
                            f.getFrontSubtext(),
                            f.getAnswer(),
                            f.getDetails()
                    );
                    return flashCard;
                }).toList();

        return new DecksResponseDto(
                deck.getId(),
                deck.getAuthor().getFullName(),
                deck.getTitle(),
                deck.getTopic(),
                deck.getMaxFlips(),
                deckDto
        );
    }

    @Transactional
    public CheckDeckResponse checkDeck(Long deckId, CheckDeckRequest request) {
        Deck deck = deckRepo.findById(deckId).orElseThrow(() -> new RuntimeException("not found"));

        int totalCount = deck.getCards().size();
        int correctCount = 0;
        List<CardCheckResultDto> results = new ArrayList<>();

        for(FlashCard card : deck.getCards()) {
            String userAnswer = "";
            for(CardAnswerDto ans : request.getAnswers()) {
                if(ans.getCardId().equals(card.getId())) {
                    if(ans.getUserAnswer() != null) {
                        userAnswer = ans.getUserAnswer();
                    }
                    break;
                }
            }

            String cleanExpected = card.getAnswer().trim().toLowerCase();
            String cleanUser = userAnswer.trim().toLowerCase();

            boolean isCorrect = cleanExpected.equals(cleanUser);

            if(isCorrect) {
                correctCount++;
            }

            results.add(new CardCheckResultDto(card.getId(), isCorrect, card.getAnswer()));
        }
        double percentage = totalCount > 0 ? (correctCount * 100.0) / totalCount : 0.0;

        return new CheckDeckResponse(totalCount, correctCount, percentage, results);
    }
}
