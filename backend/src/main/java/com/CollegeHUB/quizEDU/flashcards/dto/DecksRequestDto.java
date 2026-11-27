package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DecksRequestDto {
    private String title;
    private String topic;
    private int maxFlips;
    private List<FlashCardRequestDto> cards;
}
