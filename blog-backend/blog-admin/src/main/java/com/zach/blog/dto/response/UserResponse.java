package com.zach.blog.dto.response;

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
    private Gender gender;
}
