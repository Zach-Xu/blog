package com.zach.blog.controller;

import com.zach.blog.dto.response.AuthResponse;
import com.zach.blog.dto.request.LoginRequest;
import com.zach.blog.dto.request.RegisterRequest;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Authentication", description = "User authentication and authorization")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "User Registration", description = "Register a new user account.")
    @PostMapping("/register")
    public ResponseResult<?> register(@RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authenticationService.register(registerRequest.username(), registerRequest.password());
        return ResponseResult.ok(response);
    }

    @Operation(summary = "User Login", description = "Log in and authenticate a user.")
    @PostMapping("/login")
    public ResponseResult<?> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authenticationService.login(loginRequest.username(), loginRequest.password());
        return ResponseResult.ok(response);
    }

    @Operation(summary = "Token verification", description = "Verify user token.")
    @GetMapping("/token")
    public ResponseResult<?> verifyToken(@AuthenticationPrincipal ApplicationUser user){
        return ResponseResult.ok(user);
    }

    @Operation(summary = "User Logout", description = "Log out the currently authenticated user.")
    @PostMapping("/logout")
    public ResponseResult<?> logout(@AuthenticationPrincipal ApplicationUser user) {
        authenticationService.logout(user);
        return ResponseResult.ok();
    }
}
