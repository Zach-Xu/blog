package com.zach.blog.service.impl;

import com.zach.blog.dto.response.AuthResponse;
import com.zach.blog.enums.RoleName;
import com.zach.blog.exception.UsernameAlreadyTakenException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Role;
import com.zach.blog.model.SessionUser;
import com.zach.blog.model.UserDetailsImpl;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.service.AuthenticationService;
import com.zach.blog.service.RoleService;
import com.zach.blog.utils.BeanCopyUtils;
import com.zach.blog.utils.JwtUtils;
import com.zach.blog.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.hibernate.Session;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.stream.Collectors;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final ApplicationUserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final RedisUtils redisUtils;

    @Override
    @Transactional
    public AuthResponse register(String username, String password) {

        userRepository.findByUsername(username).ifPresent(u -> {
            throw new UsernameAlreadyTakenException();
        });

        String encodedPassword = passwordEncoder.encode(password);

        ApplicationUser user = new ApplicationUser();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        Role role = roleService.findOrCreateRole(RoleName.ROLE_USER.toString());
        user.addRole(role);

        // Persist new user
        ApplicationUser newUser = userRepository.save(user);

        redisUtils.set(USER_KEY + newUser.getId(), newUser);

        String jwt = jwtUtils.generateJwtToken(newUser.getId());
        return new AuthResponse(newUser, jwt);
    }

    @Override
    public AuthResponse login(String username, String password) {
        // Validate user credentials
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);
        UserDetailsImpl userDetails = (UserDetailsImpl) authenticate.getPrincipal();



        ApplicationUser user = userDetails.getUser();

        SessionUser sessionUser = BeanCopyUtils.copyBean(user, SessionUser.class);
        sessionUser.setRoleName(user.getRoles().stream().findFirst().map(Role::getRoleName).orElse("Regular User"));
        sessionUser.setPermissions(authenticate.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).
                filter(permission -> Strings.isNotBlank(permission)
                ).collect(Collectors.toList())
        );
        // Store user info in redis
        redisUtils.set(USER_KEY + user.getId(), sessionUser);

        // Generate Jwt
        String jwt = jwtUtils.generateJwtToken(userDetails.getUser().getId());

        return new AuthResponse(userDetails.getUser(), jwt);
    }

    @Override
    public void logout(Long userId) {
        redisUtils.delete(USER_KEY + userId);
    }
}
