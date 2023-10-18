package com.zach.blog.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RoleResponse {
    private Long id;
    private String roleName;
    private Integer displayOrder;
    private boolean enable;
    private LocalDateTime createdTime;
}
