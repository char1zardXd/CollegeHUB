package com.CollegeHUB.quizEDU.flashcards.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CheckDeckRequest {
    @NotEmpty
    private List<CardAnswerDto> answers;
}
