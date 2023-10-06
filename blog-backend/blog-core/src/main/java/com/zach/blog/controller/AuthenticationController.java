package com.zach.blog.controller;

import com.zach.blog.dto.AuthResponse;
import com.zach.blog.dto.LoginRequest;
import com.zach.blog.dto.RegisterRequest;
import com.zach.blog.dto.ResponseResult;
import com.zach.blog.model.UserDetailsImpl;
import com.zach.blog.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseResult<?> register(@RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authenticationService.register(registerRequest.username(), registerRequest.password());
        return ResponseResult.ok(response);
    }

    @PostMapping("/login")
    public ResponseResult<?> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authenticationService.login(loginRequest.username(), loginRequest.password());
        return ResponseResult.ok(response);
    }

    @PostMapping("/logout")
    public ResponseResult<?> logout(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        authenticationService.logout(userDetails);
        return ResponseResult.ok();
    }
}
