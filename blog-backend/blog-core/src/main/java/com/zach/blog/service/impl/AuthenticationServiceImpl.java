package com.zach.blog.service.impl;

import com.zach.blog.enums.RoleName;
import com.zach.blog.exception.BusinessException;
import com.zach.blog.exception.ResourceAlreadyExistException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Role;
import com.zach.blog.model.SessionUser;
import com.zach.blog.model.UserDetailsImpl;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.service.AuthenticationService;
import com.zach.blog.service.RoleService;
import com.zach.blog.utils.BeanCopyUtils;
import com.zach.blog.utils.CookieUtils;
import com.zach.blog.utils.JwtUtils;
import com.zach.blog.utils.RedisUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;
import static com.zach.blog.enums.code.BusinessErrorCode.INVALID_EMAIL;
import static com.zach.blog.enums.code.ResourceAlreadyExistCode.EMAIL_EXIST;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final ApplicationUserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final RedisUtils redisUtils;
    private final HttpServletResponse response;
    private final CookieUtils cookieUtils;

    @Override
    @Transactional
    public ApplicationUser register(String email, String password) {

        if(userRepository.existsByEmail(email)){
            throw new ResourceAlreadyExistException(EMAIL_EXIST);
        }

        String encodedPassword = passwordEncoder.encode(password);

        ApplicationUser user = new ApplicationUser();
        user.setUsername(extractEmail(email));
        user.setEmail(email);
        user.setPassword(encodedPassword);
        Role role = roleService.findOrCreateRole(RoleName.VIEWER.name());
        user.addRole(role);

        // Persist new user
        ApplicationUser newUser = userRepository.save(user);

        redisUtils.set(USER_KEY + newUser.getId(), newUser);

        String jwt = jwtUtils.generateJwtToken(newUser.getId());
        ResponseCookie cookie = cookieUtils.generateJwtCookie(jwt);
        response.setHeader(HttpHeaders.SET_COOKIE,  cookie.toString());

        return newUser;
    }

    private String extractEmail(String email){
        String[] parts = email.split("@");

        if (parts.length == 2) {
            return parts[0];
        } else {
           throw new BusinessException(INVALID_EMAIL);
        }
    }

    @Override
    public ApplicationUser login(String email, String password) {
        // Validate user credentials
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
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
        ResponseCookie cookie = cookieUtils.generateJwtCookie(jwt);
        response.setHeader(HttpHeaders.SET_COOKIE,  cookie.toString());

        return userDetails.getUser();
    }

    @Override
    public void logout(Long userId) {
        ResponseCookie cookie = cookieUtils.destroyJwtCookie();
        response.setHeader(HttpHeaders.SET_COOKIE,  cookie.toString());
        redisUtils.delete(USER_KEY + userId);
    }
}
