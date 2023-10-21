package com.zach.blog.dto.request;

import com.zach.blog.enums.Gender;

import java.util.List;

public record CreateUserRequest(
        String username,
        String phoneNumber,
        String email,
        String password,
        String nickname,
        Gender gender,
        boolean enable,
        List<Long> roleIds
) {
}
