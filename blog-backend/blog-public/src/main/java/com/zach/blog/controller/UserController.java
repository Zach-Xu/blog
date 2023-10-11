package com.zach.blog.controller;

import com.zach.blog.annotation.SystemLog;
import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.UserInfoResponse;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.service.ApplicationUserService;
import com.zach.blog.service.FileService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final FileService fileService;
    private final ApplicationUserService userService;

    @GetMapping("/me")
    public ResponseResult<?> getCurrentUserInfo(@AuthenticationPrincipal ApplicationUser user) {
        return ResponseResult.ok(BeanCopyUtils.copyBean(user, UserInfoResponse.class));
    }

    @PostMapping("/avatar")
    public ResponseResult<?> uploadAvatarImage(@AuthenticationPrincipal ApplicationUser user, MultipartFile image) throws IOException {
        fileService.UploadFile(user.getId(), image);
        return ResponseResult.ok();
    }

    @SystemLog(businessName = "Update user information")
    @PostMapping("/userInfo")
    public ResponseResult<?> updateUserInfo(@AuthenticationPrincipal ApplicationUser user, @RequestBody UpdateUserInfoRequest updateUserInfoRequest){
        userService.updateUserInfo(user.getId(), updateUserInfoRequest);
        return ResponseResult.ok();
    }
}
