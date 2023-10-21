package com.zach.blog.dto.request;

public record CreateCategoryRequest(
        String name,
        String description,
        boolean enable,
        Long parentId
) {
}
