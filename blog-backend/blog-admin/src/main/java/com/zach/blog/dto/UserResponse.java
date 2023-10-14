package com.zach.blog.dto;

import com.zach.blog.enums.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private String avatar;
    private String email;
    private Long id;
    private String username;
    private String nickname;
    private Gender gender;
}
