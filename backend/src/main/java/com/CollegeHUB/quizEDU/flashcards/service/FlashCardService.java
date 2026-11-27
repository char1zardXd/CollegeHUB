package com.CollegeHUB.quizEDU.flashcards.service;

import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.auth.repo.UsersRepo;
import com.CollegeHUB.quizEDU.flashcards.dto.DecksRequestDto;
import com.CollegeHUB.quizEDU.flashcards.dto.DecksResponseDto;
import com.CollegeHUB.quizEDU.flashcards.dto.FlashCardRequestDto;
import com.CollegeHUB.quizEDU.flashcards.dto.FlashCardResponseDto;
import com.CollegeHUB.quizEDU.flashcards.entity.Deck;
import com.CollegeHUB.quizEDU.flashcards.entity.FlashCard;
import com.CollegeHUB.quizEDU.flashcards.repository.DeckRepo;
import com.CollegeHUB.quizEDU.flashcards.repository.FlashcardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}
