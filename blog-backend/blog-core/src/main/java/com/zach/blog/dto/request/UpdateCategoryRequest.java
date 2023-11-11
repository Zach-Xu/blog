package com.zach.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateCategoryRequest(
        @NotBlank(message = "Name must be provided")
        String name,

        @NotBlank(message = "description must be provided")
        String description,

        @NotBlank(message = "Status of the category must be specified")
        Boolean enable,

        @NotNull(message = "Parent id must be specified")
        Long parentId
) {
}
