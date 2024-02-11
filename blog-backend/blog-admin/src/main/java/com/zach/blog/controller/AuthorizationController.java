package com.zach.blog.controller;

import com.zach.blog.dto.response.UserPermissionResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.UserResponse;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;
import com.zach.blog.model.Role;
import com.zach.blog.model.SessionUser;
import com.zach.blog.service.AuthorizationService;
import com.zach.blog.utils.BeanCopyUtils;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthorizationController {
    private final AuthorizationService authorizationService;

    @GetMapping("/permissions")
    public ResponseResult<UserPermissionResponse> getCurrentUserPermissions(@AuthenticationPrincipal SessionUser sessionUser) {
        ApplicationUser user = authorizationService.getUserPermission(sessionUser.getId());
        UserResponse userResponse = BeanCopyUtils.copyBean(user, UserResponse.class);
        UserPermissionResponse response = new UserPermissionResponse();
        response.setUser(userResponse);
        List<String> roles = user.getRoles().stream().
                map(Role::getRoleName).collect(Collectors.toList());

        List<String> permissions = user.getRoles().stream().
                flatMap(r -> r.getMenus().stream()
                        .map(Menu::getPermission))
                .filter(Strings::hasText)
                .collect(Collectors.toList());

        response.setRoles(roles);
        response.setPermissions(permissions);
        return ResponseResult.ok(response);
    }

}
