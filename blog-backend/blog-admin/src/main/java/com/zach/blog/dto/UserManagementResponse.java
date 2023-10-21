package com.zach.blog.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserManagementResponse {
    private Long id;
    private String username;
    private String email;
    private boolean enable;
    private LocalDateTime createdTime;
}
