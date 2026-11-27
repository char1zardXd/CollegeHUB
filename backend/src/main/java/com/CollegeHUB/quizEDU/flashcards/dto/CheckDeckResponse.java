package com.CollegeHUB.quizEDU.flashcards.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CheckDeckResponse {
    private int totalCount;
    private int correctCount;
    private double percentage;
    private List<CardCheckResultDto> results;
}
