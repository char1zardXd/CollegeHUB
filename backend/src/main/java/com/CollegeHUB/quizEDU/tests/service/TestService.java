package com.CollegeHUB.quizEDU.tests.service;

import com.CollegeHUB.quizEDU.auth.User;
import com.CollegeHUB.quizEDU.auth.UsersRepo;
import com.CollegeHUB.quizEDU.tests.TestRepo;
import com.CollegeHUB.quizEDU.tests.TestResultRepo;
import com.CollegeHUB.quizEDU.tests.dto.*;
import com.CollegeHUB.quizEDU.tests.entity.AnswerOption;
import com.CollegeHUB.quizEDU.tests.entity.Question;
import com.CollegeHUB.quizEDU.tests.entity.Test;
import com.CollegeHUB.quizEDU.tests.entity.TestResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestService {

    private final TestRepo testRepo;
    private final UsersRepo usersRepo;
    private final TestResultRepo testResultRepo;

    public TestService(TestRepo testRepo, UsersRepo usersRepo, TestResultRepo testResultRepo) {
        this.testRepo = testRepo;
        this.usersRepo = usersRepo;
        this.testResultRepo = testResultRepo;
    }

    @Transactional
    public Long createTest(CreateTestRequest request, Long authorId) {
        if (request.getQuestions() == null || request.getQuestions().isEmpty()) {
            throw new RuntimeException("Тест має містити хоча б одне питання!");
        }
        if (request.getQuestions().size() > 25) {
            throw new RuntimeException("Максимальна кількість питань у тесті - 25!");
        }

        for (var qDto : request.getQuestions())  {
            if (qDto.getOptions() == null || qDto.getOptions().size() != 4) {
                throw new RuntimeException("У питанні має бути 4 варіанти відповіді!");
            }

            int correctCount = 0;
            for (CreateOptionRequest optDto : qDto.getOptions()) {
                if (optDto.isCorrect()) {
                    correctCount++;
                }
            }

            if (correctCount != 1) {
                throw new RuntimeException("В кожному питанні має бути одна правильна відповідь!"
                );
            }
        }

        User author = usersRepo.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Автор не знайдений"));

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
                test.getAuthor() != null ? test.getAuthor().getFirstName() : "Unknown",
                test.getTitle(),
                test.getDescription(),
                null,
                test.getQuestions() != null ? test.getQuestions().size() : 0
        )).collect(Collectors.toList());
    }

    public StudentTestResponse getTestForStudent(Long testId) {
        Test test = testRepo.findById(testId)
                .orElseThrow(() -> new RuntimeException("Тест не знайдений"));

        StudentTestResponse response = new StudentTestResponse();
        response.setId(test.getId());
        response.setTitle(test.getTitle());
        response.setDescription(test.getDescription());

        List<StudentTestResponse.StudentQuestionDto> questionDtos = test.getQuestions().stream().map(q -> {
            StudentTestResponse.StudentQuestionDto qDto = new StudentTestResponse.StudentQuestionDto();
            qDto.setId(q.getId());
            qDto.setText(q.getText());

            List<StudentTestResponse.StudentOptionDto> optionDtos = q.getOptions().stream().map(opt -> {
                StudentTestResponse.StudentOptionDto optDto = new StudentTestResponse.StudentOptionDto();
                optDto.setId(opt.getId());
                optDto.setText(opt.getText());
                // Важно: isCorrect намеренно НЕ передаем студенту!
                return optDto;
            }).collect(Collectors.toList());

            qDto.setOptions(optionDtos);
            return qDto;
        }).collect(Collectors.toList());

        response.setQuestions(questionDtos);
        return response;
    }

    @Transactional
    public int submitTest(Long testId, Long studentId, SubmitTestRequest request) {
        Test test = testRepo.findById(testId)
                .orElseThrow(() -> new RuntimeException("Тест не знайдений"));
        User student = usersRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Студент не знайдений"));

        int correctAnswersCount = 0;

        for (var answer : request.getAnswers()) {
            Question question = test.getQuestions().stream()
                    .filter(q -> q.getId().equals(answer.getQuestionId()))
                    .findFirst()
                    .orElse(null);

            if (question != null) {
                boolean isCorrect = question.getOptions().stream()
                        .anyMatch(opt -> opt.getId().equals(answer.getSelectedOptionId()) && opt.isCorrect());
                if (isCorrect) {
                    correctAnswersCount++;
                }
            }
        }

        TestResult result = new TestResult();
        result.setTest(test);
        result.setStudent(student);
        result.setScore(correctAnswersCount);
        testResultRepo.save(result);

        return correctAnswersCount;
    }
}