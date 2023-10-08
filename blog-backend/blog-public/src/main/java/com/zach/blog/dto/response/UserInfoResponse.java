package com.zach.blog.dto.response;

import com.zach.blog.enums.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponse {
    private Long id;
    private String username;
    private String nickname;
    private String email;
    private Gender gender;
    private String avatar;
}
