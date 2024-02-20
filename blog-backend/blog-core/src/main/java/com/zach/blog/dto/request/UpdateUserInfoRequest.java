package com.zach.blog.dto.request;

import com.zach.blog.enums.Gender;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record UpdateUserInfoRequest(
//        Gender gender,
        String username,
        String password,
        MultipartFile avatarImage)
{
}
