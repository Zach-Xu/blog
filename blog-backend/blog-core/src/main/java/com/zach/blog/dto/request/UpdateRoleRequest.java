package com.zach.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UpdateRoleRequest(
        @NotBlank(message = "Role name must be provided")
        String roleName,

        @NotBlank(message = "Description must be provided")
        String description,

        @NotNull(message = "Whether to enable this role must be specified")
        Boolean enable,

        @NotNull(message = "At least one menu is required")
        @Size(min = 1, message = "At least one menu is required")
        List<Long> menuIds
) {
}
