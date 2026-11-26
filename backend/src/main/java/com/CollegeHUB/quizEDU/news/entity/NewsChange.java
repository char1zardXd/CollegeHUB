package com.CollegeHUB.quizEDU.news.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "news_changes")
public class NewsChange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_post_id", nullable = false)
    private NewsPost newsPost;

    public NewsChange() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public NewsPost getNewsPost() { return newsPost; }
    public void setNewsPost(NewsPost newsPost) { this.newsPost = newsPost; }
}