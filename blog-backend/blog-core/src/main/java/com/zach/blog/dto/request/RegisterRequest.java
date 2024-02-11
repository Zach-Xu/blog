package com.zach.blog.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


public record RegisterRequest(
        @NotBlank(message = "Username must be provided")
        @Email(message = "Please provide a valid email address")
        String email,

        @NotBlank(message = "Password must be provided")
        String password
) {
}
