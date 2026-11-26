package com.CollegeHUB.quizEDU.news.repository;

import com.CollegeHUB.quizEDU.news.entity.NewsPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsPostRepo extends JpaRepository<NewsPost, Long> {
}