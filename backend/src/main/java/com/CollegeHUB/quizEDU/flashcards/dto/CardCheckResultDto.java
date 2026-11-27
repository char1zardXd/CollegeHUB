package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardCheckResultDto {
    private Long cardId;
    private boolean correct;
    private String expectedAnswer;
}
