package com.CollegeHUB.quizEDU.flashcards.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FlashCardRequestDto {
    @NotBlank
    private String frontText;

    @NotBlank
    private String frontSubText;

    @NotBlank
    private String answer;

    @NotBlank
    private String detail;
}