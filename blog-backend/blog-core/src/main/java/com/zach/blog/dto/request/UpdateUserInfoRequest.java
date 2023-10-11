package com.zach.blog.dto.request;

import com.zach.blog.enums.Gender;

public record UpdateUserInfoRequest(String email, Gender gender, String nickname, String phoneNumber, String password) {
}
