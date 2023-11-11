package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryManagementResponse {
    private Long id;
    private String name;
    private String description;
    private boolean enable;
    private Long pid;
}
