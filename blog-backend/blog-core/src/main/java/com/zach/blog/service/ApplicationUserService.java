package com.zach.blog.service;

import com.zach.blog.dto.request.UpdateUserInfoRequest;

public interface ApplicationUserService {
    void updateUserInfo(Long userId, UpdateUserInfoRequest updateUserInfoRequest);
}
