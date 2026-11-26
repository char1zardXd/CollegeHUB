package com.CollegeHUB.quizEDU.news.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CreateNewsRequestDto {
    @NotBlank(message = "Заголовок обов'язковий")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "Версія обов'язкова")
    @Size(max = 255)
    private String version;

    private String accentColor;
    private String icon;

    @NotBlank(message = "Вступний опис обов'язковий")
    private String introText;
    private String highlightedNote;
    private boolean isPinned;
    private List<NewsChangeDto> changes;

    public CreateNewsRequestDto() {
    }

    public String getTitle() {
        return title;
    }

    public String getVersion() {
        return version;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public String getIcon() {
        return icon;
    }

    public String getIntroText() {
        return introText;
    }

    public String getHighlightedNote() {
        return highlightedNote;
    }

    public boolean isPinned() {
        return isPinned;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setIntroText(String introText) {
        this.introText = introText;
    }

    public void setHighlightedNote(String highlightedNote) {
        this.highlightedNote = highlightedNote;
    }

    public void setPinned(boolean pinned) {
        isPinned = pinned;
    }

    public List<NewsChangeDto> getChanges() {
        return changes;
    }

    public void setChanges(List<NewsChangeDto> changes) {
        this.changes = changes;
    }
}
