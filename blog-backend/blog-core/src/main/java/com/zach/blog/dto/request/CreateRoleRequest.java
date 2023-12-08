package com.zach.blog.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateRoleRequest(
        @NotBlank(message = "Role name must be provided") String roleName,

        @NotBlank(message = "Description must be provided") String description,

        @NotNull(message = "Whether to enable this role must be specified") Boolean enable,

        @NotNull(message = "At least one menu is required") @Size(min = 1, message = "At least one menu is required") List<Long> menuIds

) {
}
