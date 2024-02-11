package com.zach.blog.dto.response;

import com.zach.blog.enums.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimpleUserInfoResponse {
    private Long id;

    private String avatar;

    private String email;

    private String username;

    private Gender gender;
}
