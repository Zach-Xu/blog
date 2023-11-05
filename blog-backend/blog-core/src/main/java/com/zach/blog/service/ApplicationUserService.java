package com.zach.blog.service;

import com.zach.blog.dto.request.CreateUserRequest;
import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.dto.request.UpdateUserRequest;
import com.zach.blog.model.ApplicationUser;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ApplicationUserService {
    void updateUserInfo(Long userId, UpdateUserInfoRequest updateUserInfoRequest);

    Page<ApplicationUser> getUsers(Integer pageNum, Integer pageSize, String username, String email, Boolean enable);

    void createUser(CreateUserRequest request);

    void deleteUser(Long id);

    void updateUser(Long id, UpdateUserRequest request);

    ApplicationUser getUserById(Long id);

    void updateAvatarImage(ApplicationUser user, MultipartFile image) throws IOException;
}
