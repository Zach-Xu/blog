package com.zach.blog.dto.response;

import com.zach.blog.enums.AuditStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkResponse {
    private Long id;
    private String name;
    private String logo;
    private String description;
    private String url;
    private AuditStatus auditStatus;
}
