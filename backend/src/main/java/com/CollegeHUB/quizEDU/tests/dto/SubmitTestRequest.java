package com.CollegeHUB.quizEDU.tests.dto;

import java.util.List;

public class SubmitTestRequest {
    private List<StudentAnswerDto> answers;

    public List<StudentAnswerDto> getAnswers() { return answers; }
    public void setAnswers(List<StudentAnswerDto> answers) { this.answers = answers; }

    public static class StudentAnswerDto {
        private Long questionId;
        private Long selectedOptionId;

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }
        public Long getSelectedOptionId() { return selectedOptionId; }
        public void setSelectedOptionId(Long selectedOptionId) { this.selectedOptionId = selectedOptionId; }
    }
}