
package com.CollegeHUB.quizEDU.tests.dto;

import java.util.List;

public class CreateQuestionRequest {

    private String text;
    private List<CreateOptionRequest> options;

    public CreateQuestionRequest() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<CreateOptionRequest> getOptions() {
        return options;
    }

    public void setOptions(List<CreateOptionRequest> options) {
        this.options = options;
    }
}
