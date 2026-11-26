package com.CollegeHUB.quizEDU.news.servise;

import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.auth.repo.UsersRepo;
import com.CollegeHUB.quizEDU.news.dto.CreateNewsRequestDto;
import com.CollegeHUB.quizEDU.news.dto.CreateNewsResponseDto;
import com.CollegeHUB.quizEDU.news.dto.NewsChangeDto;
import com.CollegeHUB.quizEDU.news.entity.NewsChange;
import com.CollegeHUB.quizEDU.news.entity.NewsPost;
import com.CollegeHUB.quizEDU.news.repository.NewsChangeRepo;
import com.CollegeHUB.quizEDU.news.repository.NewsPostRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NewPostService {
    private final NewsPostRepo newsPostRepo;
    private final NewsChangeRepo newsChangeRepo;
    private final UsersRepo usersRepo;

    public NewPostService(NewsPostRepo newsPostRepo, NewsChangeRepo newsChangeRepo, UsersRepo usersRepo) {
        this.newsPostRepo = newsPostRepo;
        this.newsChangeRepo = newsChangeRepo;
        this.usersRepo = usersRepo;
    }

    @Transactional
    public CreateNewsResponseDto createNewPost(CreateNewsRequestDto request, Long userId) {
        User author = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("not found"));

        NewsPost post = new NewsPost();
        post.setTitle(request.getTitle().trim());
        post.setVersion(request.getVersion().trim());
        post.setAccentColor(request.getAccentColor());
        post.setIcon(request.getIcon());
        post.setIntroText(request.getIntroText().trim());
        post.setHighlightedNote(blankToNull(request.getHighlightedNote()));
        post.setPinned(request.isPinned());
        post.setAuthor(author);

        if (request.getChanges() != null) {
            for (NewsChangeDto changeDto : request.getChanges()) {
                String changeTitle = changeDto.getTitle() == null ? "" : changeDto.getTitle().trim();
                String changeDescription = changeDto.getDescription() == null ? "" : changeDto.getDescription().trim();

                // порожні пункти списку змін не зберігаємо
                if (changeTitle.isEmpty() && changeDescription.isEmpty()) continue;

                NewsChange change = new NewsChange();
                change.setTitle(changeTitle);
                change.setDescription(changeDescription);

                post.addChange(change);
            }
        }

        NewsPost savedPost = newsPostRepo.save(post);

        List<NewsChangeDto> changeDto = savedPost.getChanges().stream()
                .map(c -> {
                    NewsChangeDto dto = new NewsChangeDto();
                    dto.setTitle(c.getTitle());
                    dto.setDescription(c.getDescription());
                    return dto;
                })
                .toList();

        return new CreateNewsResponseDto(
                savedPost.getId(),
                savedPost.getTitle(),
                savedPost.getVersion(),
                savedPost.getAccentColor(),
                savedPost.getIcon(),
                savedPost.getCreatedAt(),
                author.getFullName(),
                changeDto,
                savedPost.isPinned(),
                savedPost.getIntroText(),
                savedPost.getHighlightedNote()
        );
    }

    @Transactional(readOnly = true)
    public List<CreateNewsResponseDto> getAllNewPosts() {
        return newsPostRepo.findAllByOrderByIsPinnedDescCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private CreateNewsResponseDto mapToDto(NewsPost post) {
        List<NewsChangeDto> changeDtos = post.getChanges().stream()
                .map(c -> {
                    NewsChangeDto dto = new NewsChangeDto();
                    dto.setTitle(c.getTitle());
                    dto.setDescription(c.getDescription());
                    return dto;
                })
                .toList();

        return new CreateNewsResponseDto(
                post.getId(),
                post.getTitle(),
                post.getVersion(),
                post.getAccentColor(),
                post.getIcon(),
                post.getCreatedAt(),
                post.getAuthor().getFullName(),
                changeDtos,
                post.isPinned(),
                post.getIntroText(),
                post.getHighlightedNote()
        );
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
