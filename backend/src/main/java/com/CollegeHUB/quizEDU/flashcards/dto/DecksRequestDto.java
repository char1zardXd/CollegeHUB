package com.CollegeHUB.quizEDU.flashcards.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
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

    @Positive
    private int maxFlips;

    @NotEmpty
    @Valid
    private List<FlashCardRequestDto> cards;
}
