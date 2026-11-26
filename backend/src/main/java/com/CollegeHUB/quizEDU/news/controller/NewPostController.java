package com.CollegeHUB.quizEDU.news.controller;

import com.CollegeHUB.quizEDU.news.dto.CreateNewsRequestDto;
import com.CollegeHUB.quizEDU.news.dto.CreateNewsResponseDto;
import com.CollegeHUB.quizEDU.news.servise.NewPostService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewPostController {
    private final NewPostService newPostService;

    public NewPostController(NewPostService newPostService) {
        this.newPostService = newPostService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreateNewsResponseDto createNewPosts(@RequestBody CreateNewsRequestDto request,
                                                @RequestParam Long userId) {
        return newPostService.createNewPost(request, userId);
    }

    @GetMapping
    public List<CreateNewsResponseDto> getAllNewPosts() {
        return newPostService.getAllNewPosts();
    }
}
