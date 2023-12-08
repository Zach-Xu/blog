package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RoleDetailsResponse {
    private Long id;
    private String roleName;
    private String description;
    private List<Long> menuIds;
    private Boolean enable;
}
