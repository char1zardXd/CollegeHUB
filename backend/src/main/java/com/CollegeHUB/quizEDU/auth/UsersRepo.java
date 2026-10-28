package com.CollegeHUB.quizEDU.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<User, Long> {
}