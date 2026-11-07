package com.CollegeHUB.quizEDU.auth.service;

import com.CollegeHUB.quizEDU.auth.dto.AuthResponse;
import com.CollegeHUB.quizEDU.auth.dto.LoginRequest;
import com.CollegeHUB.quizEDU.auth.dto.RegisterRequest;
import com.CollegeHUB.quizEDU.auth.dto.RegisterResponse;
import com.CollegeHUB.quizEDU.auth.entity.User;
import com.CollegeHUB.quizEDU.auth.repo.UsersRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UsersRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsersRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public RegisterResponse register (RegisterRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("This email address is already taken");
        }

        String hashPass = passwordEncoder.encode(request.getPassword());

        User user = new User(request.getEmail(), hashPass, request.getFullName(), request.getGroup());
        User savedUser = userRepo.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole()
        );
    }

    @Transactional
    public AuthResponse login (LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) throw new RuntimeException("invalid email or password");

        // потом сделаю токен для доступа
        String token = "TOKEN";

        return new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getGroup(),
                token
        );
    }
}
