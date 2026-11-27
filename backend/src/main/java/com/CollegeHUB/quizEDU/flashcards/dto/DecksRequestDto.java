package com.CollegeHUB.quizEDU.flashcards.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DecksRequestDto {
    @NotBlank
    private String title;

    @NotBlank
    private String topic;

    @NotNull
    private int maxFlips;

    @NotBlank
    private List<FlashCardRequestDto> cards;
}
