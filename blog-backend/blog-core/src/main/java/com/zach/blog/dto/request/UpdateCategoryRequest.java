package com.zach.blog.dto.request;

public record UpdateCategoryRequest(
        String name,
        String description,
        boolean enable,
        Long parentId
) {
}