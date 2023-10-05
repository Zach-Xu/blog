package com.zach.blog.service;

import com.zach.blog.dto.AuthResponse;

public interface AuthenticationService {

    AuthResponse register(String username, String password);

    AuthResponse login(String username, String password);
}
