package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CardAnswerDto {
    private Long cardId;

    private String userAnswer;
}
