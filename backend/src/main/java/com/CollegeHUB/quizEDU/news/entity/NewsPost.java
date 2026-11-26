package com.CollegeHUB.quizEDU.news.entity;

import com.CollegeHUB.quizEDU.auth.entity.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news_posts")
public class NewsPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String version;

    @Column(name = "accent_color")
    private String accentColor;

    private String icon;

    @Column(name = "intro_text", columnDefinition = "TEXT", nullable = false)
    private String introText;

    @Column(name = "highlighted_note", columnDefinition = "TEXT", nullable = true)
    private String highlightedNote;

    @Column(name = "is_pinned", nullable = false)
    private boolean isPinned;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @OneToMany(mappedBy = "newsPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsChange> changes = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public void addChange(NewsChange change) {
        changes.add(change);
        change.setNewsPost(this);
    }

    public NewsPost() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public String getAccentColor() { return accentColor; }
    public void setAccentColor(String accentColor) { this.accentColor = accentColor; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getIntroText() { return introText; }
    public void setIntroText(String introText) { this.introText = introText; }

    public String getHighlightedNote() { return highlightedNote; }
    public void setHighlightedNote(String highlightedNote) { this.highlightedNote = highlightedNote; }

    public boolean isPinned() { return isPinned; }
    public void setPinned(boolean pinned) { isPinned = pinned; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }

    public List<NewsChange> getChanges() { return changes; }
    public void setChanges(List<NewsChange> changes) { this.changes = changes; }
}