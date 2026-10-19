package com.CollegeHUB.quizEDU.tests.service;

import com.CollegeHUB.quizEDU.auth.User;
import com.CollegeHUB.quizEDU.auth.UsersRepo;
import com.CollegeHUB.quizEDU.tests.TestRepo;
import com.CollegeHUB.quizEDU.tests.dto.*;
import com.CollegeHUB.quizEDU.tests.entity.*;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    private final TestRepo testRepo;
    private final UsersRepo usersRepo;

    public TestService(TestRepo testRepo, UsersRepo usersRepo) {
        this.testRepo = testRepo;
        this.usersRepo = usersRepo;
    }

    public Long createTest(CreateTestRequest request, Long authorId) {
        User author = usersRepo.findById(authorId).orElseThrow(() -> new RuntimeException("Автор не найден"));

        Test test = new Test();
        test.setTitle(request.getTitle());
        test.setDescription(request.getDescription());
        test.setAuthor(author);

        for (CreateQuestionRequest qDto : request.getQuestions()) {
            Question question = new Question();
            question.setText(qDto.getText());

            for (CreateOptionRequest optDto : qDto.getOptions()) {
                AnswerOption option = new AnswerOption();
                option.setText(optDto.getText());
                option.setCorrect(optDto.isCorrect());

                question.addOption(option);
            }

            test.addQuestion(question);
        }

        Test savedTest = testRepo.save(test);

        return savedTest.getId();
    }
}
