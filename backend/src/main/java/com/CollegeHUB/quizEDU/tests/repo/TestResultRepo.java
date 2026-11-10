package com.CollegeHUB.quizEDU.tests.repo;

import com.CollegeHUB.quizEDU.tests.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TestResultRepo extends JpaRepository<TestResult, Long> {

    @Query("SELECT AVG(tr.percentage) FROM TestResult tr WHERE tr.student.id = :studentId")
    long getAverageScoreByStudentId(@Param("studentId") Long userId);
    long countByStudentId(Long userId);
    long countByStudentIdAndPercentageGreaterThanEqual(Long userId, double minPercentage);
}