package com.zach.blog.dto.response;

import com.zach.blog.model.ApplicationUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {

    private ApplicationUser user;

    private String Jwt;
}
