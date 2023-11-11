package com.zach.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCategoryRequest(
        @NotBlank(message = "Name must be provided")
        String name,

        @NotBlank(message = "Description must be provided")
        String description,

        @NotNull(message = "Whether to enable this category must be specified")
        Boolean enable,

        @NotNull(message = "Parent category must be specified")
        Long parentId
) {
}
