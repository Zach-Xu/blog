package com.zach.blog.service.impl;

import com.zach.blog.exception.UserNotExistException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Role;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final ApplicationUserRepository userRepository;
    @Override
    public ApplicationUser getUserPermission(ApplicationUser user) {
        return userRepository.findUserRoleAndPermissionsById(user.getId()).orElseThrow(UserNotExistException::new);
    }

}
