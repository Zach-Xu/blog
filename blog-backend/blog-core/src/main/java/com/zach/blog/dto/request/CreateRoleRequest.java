package com.zach.blog.dto.request;

import java.util.List;

public record CreateRoleRequest(
                String roleName,
                boolean enable,
                List<Long> menuIds,
                String description) {
}
