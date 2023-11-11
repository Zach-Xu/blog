package com.zach.blog.dto.response;

import com.zach.blog.dto.response.RoleNameResponse;
import com.zach.blog.enums.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserInfoForUpdateResponse {
    private Long id;
    private String nickname;
    private String phoneNumber;
    private String email;
    private Gender gender;
    private boolean enable;
    private List<RoleNameResponse> roles;
}
