package com.zach.blog.dto.request;

import jakarta.validation.constraints.NotNull;

public record ChangeCategoryStatusRequest(
        @NotNull(message = "Please specify the status")
        Boolean enable
) {
}
