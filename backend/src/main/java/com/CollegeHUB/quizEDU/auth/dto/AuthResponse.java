package com.CollegeHUB.quizEDU.auth.dto;

public class AuthResponse {

    private Long id;
    private String email;
    private String fullName;
    private String role;
    private String group;
    private String token;

    public AuthResponse() {
    }

    public AuthResponse(Long id, String email, String fullName, String role, String group, String token) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.group = group;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getRole() {
        return role;
    }

    public String getGroup() {
        return group;
    }

    public String getToken() {
        return token;
    }
}
