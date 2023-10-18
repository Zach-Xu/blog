package com.zach.blog.dto.request;

import java.util.List;

public record UpdateRoleRequest(
        String roleName,
        Integer displayOrder,
        boolean enable,
        String description,
        List<Long> menuIds
) {
}
