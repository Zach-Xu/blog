package com.zach.blog.service;

import com.zach.blog.model.ApplicationUser;

public interface AuthorizationService {
    ApplicationUser getUserPermission(Long userId);

}
