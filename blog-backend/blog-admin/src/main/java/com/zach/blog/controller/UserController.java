package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.dto.response.RoleNameResponse;
import com.zach.blog.dto.response.UserInfoForUpdateResponse;
import com.zach.blog.dto.response.UserManagementResponse;
import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.request.ChangeStatusRequest;
import com.zach.blog.dto.request.CreateUserRequest;
import com.zach.blog.dto.request.UpdateUserRequest;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Role;
import com.zach.blog.model.SessionUser;
import com.zach.blog.service.ApplicationUserService;
import com.zach.blog.utils.BeanCopyUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final ApplicationUserService userService;

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system', 'system:user', 'system:user:query')")
    @GetMapping
    public ResponseResult<?> getUsers(@RequestParam(defaultValue = "0") Integer pageNum,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(required = false) String username, @RequestParam(required = false) String email,
            @RequestParam(required = false) Boolean enable) {
        Page<ApplicationUser> page = userService.getUsers(pageNum, pageSize, username, email, enable);
        List<UserManagementResponse> users = BeanCopyUtils.copyBeanList(page.getContent(),
                UserManagementResponse.class);
        PageResponse pageResponse = new PageResponse(users, page.getTotalPages(), page.getTotalElements());
        return ResponseResult.ok(pageResponse);
    }

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system', 'system:user', 'system:user:query')")
    @GetMapping("/{id}")
    public ResponseResult<?> getUser(@PathVariable Long id) {
        ApplicationUser user = userService.getUserById(id);
        UserInfoForUpdateResponse response = BeanCopyUtils.copyBean(user, UserInfoForUpdateResponse.class);
        List<Long> roleIds = user.getRoles().stream().map(Role::getId).collect(Collectors.toList());
        response.setRoleIds(roleIds);
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:user', 'system:user:add')")
    @Validate
    @PostMapping
    public ResponseResult<?> createUser(@RequestBody @Valid CreateUserRequest request, BindingResult bindingResult) {
        ApplicationUser user = userService.createUser(request);
        UserManagementResponse response = BeanCopyUtils.copyBean(user, UserManagementResponse.class);
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:user', 'system:user:edit')")
    @Validate
    @PutMapping("/{id}/status")
    public ResponseResult<?> updateUserStatus(@PathVariable Long id, @AuthenticationPrincipal SessionUser user,
            @RequestBody @Valid ChangeStatusRequest request, BindingResult bindingResult) {
        userService.changeUserStatus(id, request.enable(), user.getId());
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:user', 'system:user:edit')")
    @PutMapping("/{id}")
    public ResponseResult<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        userService.updateUser(id, request);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:user', 'system:user:remove')")
    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseResult.ok();
    }
}
