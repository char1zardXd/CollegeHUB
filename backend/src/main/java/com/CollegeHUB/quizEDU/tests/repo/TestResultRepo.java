package com.CollegeHUB.quizEDU.tests.repo;

import com.CollegeHUB.quizEDU.tests.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestResultRepo extends JpaRepository<TestResult, Long> {
}