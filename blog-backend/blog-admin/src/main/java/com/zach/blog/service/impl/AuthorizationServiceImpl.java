package com.zach.blog.service.impl;

import com.zach.blog.enums.code.ResourceNotFoundCode;
import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.service.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final ApplicationUserRepository userRepository;
    @Override
    public ApplicationUser getUserPermission(Long userId) {
        return userRepository.findUserRoleAndPermissionsById(userId).orElseThrow(() -> new ResourceNotFoundException(ResourceNotFoundCode.USER_NOT_FOUND));
    }

}
