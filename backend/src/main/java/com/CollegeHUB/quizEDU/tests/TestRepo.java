package com.CollegeHUB.quizEDU.tests;

import com.CollegeHUB.quizEDU.tests.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepo extends JpaRepository<Test, Long> {
}