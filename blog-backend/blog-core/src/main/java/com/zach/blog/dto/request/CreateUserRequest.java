package com.zach.blog.dto.request;

import com.zach.blog.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateUserRequest(
        @NotBlank(message = "Username must be provided")
        String username,

        @NotBlank(message = "Nickname must be provided")
        String nickname,

        String phoneNumber,

        @NotBlank(message = "Email must be provided")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Password must be provided")
        String password,

        @NotNull(message = "Gender must be provided")
        Gender gender,

        @NotNull(message = "Where to enable this user must be specified")
        Boolean enable,

        @NotNull(message = "At least one role is required")
        @Size(min = 1, message = "At least one role is required")
        List<Long> roleIds
) {
}
