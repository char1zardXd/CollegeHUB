package com.CollegeHUB.quizEDU.tests.service;

import com.CollegeHUB.quizEDU.tests.dto.CreateTestRequest;
import com.CollegeHUB.quizEDU.tests.dto.TestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")

public class TestControler {
    private final TestService testService;

    public TestControler(TestService testService) {
        this.testService = testService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createTestController(@RequestBody CreateTestRequest request,
                                     @RequestParam Long authorId) {
        return testService.createTest(request, authorId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TestResponse> getAllTests() {
        return testService.getAllTests();
    }
}