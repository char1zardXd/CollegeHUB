package com.CollegeHUB.quizEDU.tests;

import com.CollegeHUB.quizEDU.tests.dto.CreateTestRequest;
import com.CollegeHUB.quizEDU.tests.service.TestService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @RequestMapping("/api/tests")
    @ResponseStatus(HttpStatus.CREATED)
    public Long createTestController(@RequestBody CreateTestRequest request,
                                     @RequestParam Long authorId) {
        return testService.createTest(request, authorId);
    }
}