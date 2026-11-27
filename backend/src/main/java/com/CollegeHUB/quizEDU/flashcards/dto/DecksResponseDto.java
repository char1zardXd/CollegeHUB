package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DecksResponseDto {
    private Long id;
    private String author;
    private String title;
    private String topic;
    private int maxFlips;
    private List<FlashCardResponseDto> cards;
}
