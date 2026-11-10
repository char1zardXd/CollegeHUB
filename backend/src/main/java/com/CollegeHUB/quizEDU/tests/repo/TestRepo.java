package com.CollegeHUB.quizEDU.tests.repo;

import com.CollegeHUB.quizEDU.tests.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepo extends JpaRepository<Test, Long> {
}