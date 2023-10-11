package com.zach.blog.service;

import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.model.ApplicationUser;

import java.util.List;

public interface ApplicationUserService {

    void createUsers(List<ApplicationUser> userList);

    ApplicationUser findUserByUsername(String username);

    void updateUserInfo(Long userId, UpdateUserInfoRequest updateUserInfoRequest);
}
