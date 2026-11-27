package com.CollegeHUB.quizEDU.flashcards.controller;

import com.CollegeHUB.quizEDU.flashcards.dto.CheckDeckRequest;
import com.CollegeHUB.quizEDU.flashcards.dto.CheckDeckResponse;
import com.CollegeHUB.quizEDU.flashcards.dto.DecksRequestDto;
import com.CollegeHUB.quizEDU.flashcards.dto.DecksResponseDto;
import com.CollegeHUB.quizEDU.flashcards.service.FlashCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/flashcard")
public class FlashCardController {
    private final FlashCardService flashCardService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DecksResponseDto createNewDeck(@RequestBody DecksRequestDto request, @RequestParam Long userId) {
        return flashCardService.createNewDecks(request, userId);
    }

    @GetMapping
    public List<DecksResponseDto> getAllDecks() {
        return flashCardService.getAllDecks();
    }

    @PostMapping("/{deckId}/check")
    public CheckDeckResponse checkDeck (
            @PathVariable Long deckId,
            @Valid @RequestBody CheckDeckRequest request
            ) {
        return flashCardService.checkDeck(deckId, request);
    }
}
