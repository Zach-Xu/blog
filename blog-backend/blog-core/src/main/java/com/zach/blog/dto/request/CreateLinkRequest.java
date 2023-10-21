package com.zach.blog.dto.request;

import com.zach.blog.enums.AuditStatus;

public record CreateLinkRequest(
        String name,
        String description,
        String logo,
        String url,
        AuditStatus status
) {
}
