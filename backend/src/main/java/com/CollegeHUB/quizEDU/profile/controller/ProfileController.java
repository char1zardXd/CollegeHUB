package com.CollegeHUB.quizEDU.profile.controller;

import com.CollegeHUB.quizEDU.profile.dto.ProfileResponse;
import com.CollegeHUB.quizEDU.profile.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ProfileResponse getProfile (@PathVariable("userId") Long userId) {
        return profileService.showResult(userId);
    }
}
