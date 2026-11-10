package com.CollegeHUB.quizEDU.profile.service;

import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.auth.repo.UsersRepo;
import com.CollegeHUB.quizEDU.profile.dto.ProfileResponse;
import com.CollegeHUB.quizEDU.tests.repo.TestResultRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {
    private final UsersRepo usersRepo;
    private final TestResultRepo testResultRepo;

    public ProfileService(UsersRepo usersRepo, TestResultRepo testResultRepo) {
        this.usersRepo = usersRepo;
        this.testResultRepo = testResultRepo;
    }

    @Transactional(readOnly = true)
    public ProfileResponse showResult(Long userId) {
        User user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("invalid id"));

        long testsResult = testResultRepo.countByStudentId(userId);
        long perfectTestsCount = testResultRepo.countByStudentIdAndPercentageGreaterThanEqual(userId, 85.0);
        double averageScore = testResultRepo.getAverageScoreByStudentId(userId);

        return new ProfileResponse(
                user.getEmail(),
                user.getFullName(),
                user.getGroup(),
                user.getEntryTime(),
                user.getCompletedTestsCount(),
                testsResult,
                averageScore,
                perfectTestsCount
        );
    }
}
