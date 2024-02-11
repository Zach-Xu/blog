package com.zach.blog.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtils {

    @Value("${zach.blog.jwt.name}")
    private String jwtName;

    @Value("${zach.blog.jwt.expirationMs}")
    private int jwtExpirationMs;

    public ResponseCookie generateJwtCookie(String jwt){
        return ResponseCookie.from(jwtName, jwt)
                .path("/")
                .httpOnly(true)
                .domain(null)   // for development env
                .secure(true)  // true to make the cookie HTTPS only
                .maxAge(jwtExpirationMs / 1000)
                .sameSite("None")
                .build();
    }

    public ResponseCookie destroyJwtCookie(){
        return  ResponseCookie.from(jwtName, null)
                .path("/")
                .httpOnly(true)
                .domain(null)   // for development env
                .secure(true)  // true to make the cookie HTTPS only
                .maxAge(0)
                .sameSite("None")
                .build();
    }
}
