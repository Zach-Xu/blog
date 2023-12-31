package com.zach.blog.dto.response;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.zach.blog.model.ApplicationUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    @JsonIncludeProperties({"username", "id", "roles", "avatar", "gender"})
    private ApplicationUser user;

    private String jwt;

    public AuthResponse(ApplicationUser user, String jwt) {
        this.user = user;
        this.jwt = jwt;
    }
}
