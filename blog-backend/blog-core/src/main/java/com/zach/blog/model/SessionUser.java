package com.zach.blog.model;

import com.zach.blog.enums.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SessionUser {
    private Long id;

    private String avatar;

    private String email;

    private String username;

    private Gender gender;

    private String roleName;

    private List<String> permissions;
}
