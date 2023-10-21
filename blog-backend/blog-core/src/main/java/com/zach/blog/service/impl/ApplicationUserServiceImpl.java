package com.zach.blog.service.impl;

import com.zach.blog.dto.request.CreateUserRequest;
import com.zach.blog.dto.request.UpdateUserInfoRequest;
import com.zach.blog.dto.request.UpdateUserRequest;
import com.zach.blog.exception.SystemException;
import com.zach.blog.exception.UserNotExistException;
import com.zach.blog.model.Role;
import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.ApplicationUserService;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.utils.BeanCopyUtils;
import com.zach.blog.utils.RedisUtils;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;
import static com.zach.blog.repository.ApplicationUserRepository.Specs.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationUserServiceImpl implements ApplicationUserService {

    private final ApplicationUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisUtils redisUtils;
    private final RoleRepository roleRepository;

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

    @Override
    public Page<ApplicationUser> getUsers(Integer pageNum, Integer pageSize, String username, String email, Boolean enable) {
        Sort sort = Sort.by("username");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
        Specification<ApplicationUser> specs = Specification.where(null);
        if(Strings.hasText(username)){
            specs = specs.and(containsUsername(username));
        }
        if(Strings.hasText(email)){
            specs = specs.and(containsEmail(email));
        }
        if(Objects.nonNull(enable)){
            specs = specs.and(isEnable(enable));
        }
        return userRepository.findAll(specs, pageRequest);
    }

    @Override
    public void createUser(CreateUserRequest request) {
        ApplicationUser user = new ApplicationUser();
        user.setUsername(request.username());
        user.setNickname(request.nickname());
        user.setGender(request.gender());
        user.setPhoneNumber(request.phoneNumber());
        user.setEmail(request.email());
        user.setEnable(request.enable());
        user.setPassword(passwordEncoder.encode(request.password()));

        Set<Role> roles = request.roleIds().stream()
                .map(id -> roleRepository.getReferenceById(id))
                .collect(Collectors.toSet());
        user.setRoles(roles);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        // ToDo: refactor exception handling
        ApplicationUser user = userRepository.findById(id).orElseThrow(SecurityException::new);
        user.setDeleted(true);
        userRepository.save(user);
    }

    @Override
    public void updateUser(Long id, UpdateUserRequest request) {
        ApplicationUser user = userRepository.findById(id).orElseThrow(SecurityException::new);
        user.setNickname(request.nickname());
        user.setPhoneNumber(request.phoneNumber());
        if(userRepository.existsByEmail(request.email())){
            throw new SystemException();
        }
        user.setEmail(request.email());
        user.setGender(request.gender());
        user.setEnable(request.enable());

        Set<Role> roles = request.roleIds().stream()
                .map(roleId -> roleRepository.getReferenceById(roleId))
                .collect(Collectors.toSet());
        user.setRoles(roles);

        userRepository.save(user);
    }

    @Override
    public ApplicationUser getUserById(Long id) {
        // ToDo: refactor exception handing
         return userRepository.findById(id).orElseThrow(SystemException::new);
    }
}
