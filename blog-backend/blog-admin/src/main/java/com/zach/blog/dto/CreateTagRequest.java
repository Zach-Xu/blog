package com.zach.blog.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateTagRequest(
        @NotBlank(message = "Tag name must be provided")
        String name,
        @NotBlank(message = "Description must be provided")
        String description
) {
}
