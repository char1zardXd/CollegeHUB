package com.CollegeHUB.quizEDU.auth.service;

import com.CollegeHUB.quizEDU.auth.dto.AuthResponse;
import com.CollegeHUB.quizEDU.auth.dto.LoginRequest;
import com.CollegeHUB.quizEDU.auth.dto.RegisterRequest;
import com.CollegeHUB.quizEDU.auth.dto.RegisterResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse register (@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login (@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}