package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FlashCardRequestDto {
    private String frontText;
    private String frontSubText;
    private String answer;
    private String detail;
}
