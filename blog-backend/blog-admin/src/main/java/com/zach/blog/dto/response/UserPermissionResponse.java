package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserPermissionResponse {
    private UserResponse user;
    private List<String> roles;
    private List<String> permissions;
}
