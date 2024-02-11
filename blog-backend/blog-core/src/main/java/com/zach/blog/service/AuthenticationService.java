package com.zach.blog.service;

import com.zach.blog.model.ApplicationUser;

public interface AuthenticationService {
    ApplicationUser register(String email, String password);

    ApplicationUser login(String email, String password);

    void logout(Long userId);
}
