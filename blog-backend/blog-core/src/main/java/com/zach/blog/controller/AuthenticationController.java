package com.zach.blog.controller;

import com.zach.blog.dto.request.LoginRequest;
import com.zach.blog.dto.request.RegisterRequest;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.SimpleUserInfoResponse;
import com.zach.blog.enums.code.HttpStatusCode;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.SessionUser;
import com.zach.blog.service.AuthenticationService;
import com.zach.blog.utils.BeanCopyUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Tag(name = "Authentication", description = "User authentication and authorization")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "User Registration", description = "Register a new user account.")
    @PostMapping("/register")
    public ResponseResult<?> register(@RequestBody RegisterRequest registerRequest) {
        ApplicationUser user = authenticationService.register(registerRequest.email(), registerRequest.password());
        SimpleUserInfoResponse response = BeanCopyUtils.copyBean(user, SimpleUserInfoResponse.class);
        return ResponseResult.ok(response);
    }

    @Operation(summary = "User Login", description = "Log in and authenticate a user.")
    @PostMapping("/login")
    public ResponseResult<?> login(@RequestBody LoginRequest loginRequest) {
        ApplicationUser user = authenticationService.login(loginRequest.email(), loginRequest.password());
        SimpleUserInfoResponse response = BeanCopyUtils.copyBean(user, SimpleUserInfoResponse.class);
        return ResponseResult.ok(response);
    }

    @Operation(summary = "Token verification", description = "Verify user token.")
    @GetMapping("/token")
    public ResponseResult<?> verifyToken(@AuthenticationPrincipal SessionUser user){
        if(Objects.isNull(user)){
            return ResponseResult.error(HttpStatusCode.INVALID_TOKEN);
        }
        SimpleUserInfoResponse response = BeanCopyUtils.copyBean(user, SimpleUserInfoResponse.class);
        return ResponseResult.ok(response);
    }

    @Operation(summary = "User Logout", description = "Log out the currently authenticated user.")
    @PostMapping("/logout")
    public ResponseResult<?> logout(@AuthenticationPrincipal SessionUser user) {
        authenticationService.logout(user.getId());
        return ResponseResult.ok();
    }
}
