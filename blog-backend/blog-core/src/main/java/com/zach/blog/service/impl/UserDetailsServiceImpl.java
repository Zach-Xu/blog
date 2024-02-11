package com.zach.blog.service.impl;

import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.UserDetailsImpl;
import com.zach.blog.repository.ApplicationUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ApplicationUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ApplicationUser> userOpt = userRepository.findUserAndPermissionByEmail(username);
        return userOpt.map(UserDetailsImpl::new).orElseThrow(()-> new UsernameNotFoundException("Invalid credentials"));
    }
}
