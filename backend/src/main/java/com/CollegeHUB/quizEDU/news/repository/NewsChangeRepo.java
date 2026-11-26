package com.CollegeHUB.quizEDU.news.repository;

import com.CollegeHUB.quizEDU.news.entity.NewsChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsChangeRepo extends JpaRepository<NewsChange, Long> {
}