package com.zach.blog.controller;

import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.UserInfoResponse;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/me")
    public ResponseResult<?> getCurrentUserInfo(@AuthenticationPrincipal ApplicationUser user) {
        return ResponseResult.ok(BeanCopyUtils.copyBean(user, UserInfoResponse.class));
    }
}
