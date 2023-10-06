package com.zach.blog.service;

import com.zach.blog.dto.AuthResponse;
import com.zach.blog.model.UserDetailsImpl;

public interface AuthenticationService {

    AuthResponse register(String username, String password);

    AuthResponse login(String username, String password);

    void logout(UserDetailsImpl userDetails);
}
