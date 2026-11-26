package com.CollegeHUB.quizEDU.news.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CreateNewsResponseDto {
    private Long id;
    private String title;
    private String version;
    private String accentColor;
    private String icon;
    private LocalDateTime createdAt;
    private String authorName;
    private List<NewsChangeDto> changes;
    private boolean isPinned;
    private String introText;
    private String highlightedNote;

    public CreateNewsResponseDto(Long id, String title, String version, String accentColor, String icon, LocalDateTime createdAt, String authorName, List<NewsChangeDto> changes, boolean isPinned, String introText, String highlightedNote) {
        this.id = id;
        this.title = title;
        this.version = version;
        this.accentColor = accentColor;
        this.icon = icon;
        this.createdAt = createdAt;
        this.authorName = authorName;
        this.changes = changes;
        this.isPinned = isPinned;
        this.introText = introText;
        this.highlightedNote = highlightedNote;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public List<NewsChangeDto> getChanges() {
        return changes;
    }

    public void setChanges(List<NewsChangeDto> changes) {
        this.changes = changes;
    }

    public boolean isPinned() {
        return isPinned;
    }

    public void setPinned(boolean pinned) {
        isPinned = pinned;
    }

    public String getIntroText() {
        return introText;
    }

    public void setIntroText(String introText) {
        this.introText = introText;
    }

    public String getHighlightedNote() {
        return highlightedNote;
    }

    public void setHighlightedNote(String highlightedNote) {
        this.highlightedNote = highlightedNote;
    }
}
