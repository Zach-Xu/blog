package com.zach.blog.service;

import com.zach.blog.dto.request.CreateUserRequest;
import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.dto.request.UpdateUserRequest;
import com.zach.blog.model.ApplicationUser;

import com.zach.blog.model.SessionUser;
import jakarta.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ApplicationUserService {
    void updateUserInfo(Long userId, UpdateUserInfoRequest updateUserInfoRequest) throws IOException;

    Page<ApplicationUser> getUsers(Integer pageNum, Integer pageSize, String username, String email, Boolean enable);

    ApplicationUser createUser(CreateUserRequest request);

    void deleteUser(Long id);

    void updateUser(Long id, UpdateUserRequest request);

    ApplicationUser getUserById(Long id);

    void updateAvatarImage(SessionUser user, MultipartFile image) throws IOException;

    void changeUserStatus(Long id, Boolean enable, Long userId);
}
