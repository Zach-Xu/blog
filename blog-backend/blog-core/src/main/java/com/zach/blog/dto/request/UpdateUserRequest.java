package com.zach.blog.dto.request;

import com.zach.blog.enums.Gender;

import java.util.List;

public record UpdateUserRequest(
        String nickname,
        String phoneNumber,
        String email,
        Gender gender,
        boolean enable,
        List<Long> roleIds
) {
}
