package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FlashCardResponseDto {
    private Long id;
    private String frontText;
    private String frontSubText;
    private String answer;
    private String detail;
}
