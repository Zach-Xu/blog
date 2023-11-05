package com.zach.blog.controller;

import com.zach.blog.annotation.SystemLog;
import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.UserInfoResponse;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.service.ApplicationUserService;
import com.zach.blog.service.FileService;
import com.zach.blog.utils.BeanCopyUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "User", description = "Manage user information and avatars")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final ApplicationUserService userService;

    @Operation(summary = "Get Current User Info", description = "Retrieve the profile information of the currently authenticated user.")
    @GetMapping("/me")
    public ResponseResult<?> getCurrentUserInfo(@AuthenticationPrincipal ApplicationUser user) {
        return ResponseResult.ok(BeanCopyUtils.copyBean(user, UserInfoResponse.class));
    }


    @Operation(summary = "Upload Avatar Image", description = "Upload or update the user's avatar image.")
    @SystemLog(businessName = "Upload avatar image")
    @PostMapping("/avatar")
    public ResponseResult<?> uploadAvatarImage(@AuthenticationPrincipal ApplicationUser user, MultipartFile image) throws IOException {
        userService.updateAvatarImage(user, image);
        return ResponseResult.ok();
    }

    @Operation(summary = "Update User Info", description = "Update user information.")
    @PostMapping("/userInfo")
    public ResponseResult<?> updateUserInfo(@AuthenticationPrincipal ApplicationUser user, @RequestBody UpdateUserInfoRequest updateUserInfoRequest){
        userService.updateUserInfo(user.getId(), updateUserInfoRequest);
        return ResponseResult.ok();
    }
}
