package com.zach.blog.dto.request;

import java.util.List;

public record UpdateRoleRequest(
                String roleName,
                boolean enable,
                String description,
                List<Long> menuIds) {
}
