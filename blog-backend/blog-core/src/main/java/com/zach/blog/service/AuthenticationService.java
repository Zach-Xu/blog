package com.zach.blog.service;

import com.zach.blog.dto.response.AuthResponse;
import com.zach.blog.model.ApplicationUser;

public interface AuthenticationService {

    AuthResponse register(String username, String password);

    AuthResponse login(String username, String password);

    void logout(ApplicationUser user);
}
