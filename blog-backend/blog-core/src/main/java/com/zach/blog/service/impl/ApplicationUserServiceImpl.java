package com.zach.blog.service.impl;

import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.exception.UserNotExistException;
import com.zach.blog.service.ApplicationUserService;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.utils.BeanCopyUtils;
import com.zach.blog.utils.RedisUtils;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationUserServiceImpl implements ApplicationUserService {

    private final ApplicationUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisUtils redisUtils;

    @Override
    public void updateUserInfo(Long userId, UpdateUserInfoRequest updateUserInfoRequest) {
        ApplicationUser user = userRepository.findById(userId).orElseThrow(UserNotExistException::new);
        BeanCopyUtils.copyPropertiesIgnoreNull(updateUserInfoRequest, user);
        if (Strings.hasText(updateUserInfoRequest.password())) {
            user.setPassword(passwordEncoder.encode(updateUserInfoRequest.password()));
        }
        ApplicationUser updatedUser = userRepository.save(user);
        // Sync user info with redis
        redisUtils.set(USER_KEY + userId, updatedUser);
    }
}
