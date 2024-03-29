package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RoleResponse {
    private Long id;
    private String roleName;
    private boolean enable;
    private String description;
    private LocalDateTime createdTime;
}
