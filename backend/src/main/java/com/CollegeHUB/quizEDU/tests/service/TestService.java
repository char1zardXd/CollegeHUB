package com.CollegeHUB.quizEDU.tests.service;

import com.CollegeHUB.quizEDU.auth.User;
import com.CollegeHUB.quizEDU.auth.UsersRepo;
import com.CollegeHUB.quizEDU.tests.TestRepo;
import com.CollegeHUB.quizEDU.tests.dto.CreateOptionRequest;
import com.CollegeHUB.quizEDU.tests.dto.CreateQuestionRequest;
import com.CollegeHUB.quizEDU.tests.dto.CreateTestRequest;
import com.CollegeHUB.quizEDU.tests.dto.TestResponse;
import com.CollegeHUB.quizEDU.tests.entity.AnswerOption;
import com.CollegeHUB.quizEDU.tests.entity.Question;
import com.CollegeHUB.quizEDU.tests.entity.Test;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestService {

    private final TestRepo testRepo;
    private final UsersRepo usersRepo;

    public TestService(TestRepo testRepo, UsersRepo usersRepo) {
        this.testRepo = testRepo;
        this.usersRepo = usersRepo;
    }

    @Transactional
    public Long createTest(CreateTestRequest request, Long authorId) {
        if (request.getQuestions() == null || request.getQuestions().isEmpty()) {
            throw new RuntimeException("Тест должен содержать хотя бы один вопрос!");
        }
        if (request.getQuestions().size() > 25) {
            throw new RuntimeException("Максимальное количество вопросов в тесте — 25!");
        }

        for (var qDto : request.getQuestions())  {
            if (qDto.getOptions() == null || qDto.getOptions().size() != 4) {
                throw new RuntimeException("В вопросе должно быть ровно 4 варианта ответа!");
            }

            int correctCount = 0;
            for (CreateOptionRequest optDto : qDto.getOptions()) {
                if (optDto.isCorrect()) {
                    correctCount++;
                }
            }

            if (correctCount != 1) {
                throw new RuntimeException("В каждом вопросе должен быть ровно один правильный ответ!"
                );
            }
        }

        User author = usersRepo.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Автор не найден"));

        Test test = new Test();
        test.setTitle(request.getTitle());
        test.setDescription(request.getDescription());
        test.setAuthor(author);

        for (var qDto : request.getQuestions()) {
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

    public List<TestResponse> getAllTests() {
        List<Test> tests = testRepo.findAll();
        return tests.stream().map(test -> new TestResponse(
                test.getId(),
                test.getAuthor() != null ? test.getAuthor().getFullName() : "Unknown",
                test.getTitle(),
                test.getDescription(),
                null,
                test.getQuestions() != null ? test.getQuestions().size() : 0
        )).collect(Collectors.toList());
    }
}