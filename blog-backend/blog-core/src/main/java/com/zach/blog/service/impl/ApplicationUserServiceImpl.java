package com.zach.blog.service.impl;

import com.zach.blog.exception.UserNotExistException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.service.ApplicationUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationUserServiceImpl implements ApplicationUserService {

    private final ApplicationUserRepository userRepository;

    @Override
    public void createUsers(List<ApplicationUser> userList) {
        userRepository.saveAll(userList);
    }

    @Override
    public ApplicationUser findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserNotExistException::new);
    }
}
