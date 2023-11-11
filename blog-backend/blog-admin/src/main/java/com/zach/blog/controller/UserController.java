package com.zach.blog.controller;

import com.zach.blog.dto.response.RoleNameResponse;
import com.zach.blog.dto.response.UserInfoForUpdateResponse;
import com.zach.blog.dto.response.UserManagementResponse;
import com.zach.blog.dto.request.CreateUserRequest;
import com.zach.blog.dto.request.UpdateUserRequest;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.service.ApplicationUserService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final ApplicationUserService userService;

    @GetMapping
    public ResponseResult<?> getUsers(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                      @RequestParam(required = false) String username, @RequestParam(required = false) String email,
                                      @RequestParam(required = false) Boolean enable) {
        Page<ApplicationUser> page = userService.getUsers(pageNum, pageSize, username, email, enable);
        List<UserManagementResponse> users = BeanCopyUtils.copyBeanList(page.getContent(), UserManagementResponse.class);
        PageResponse pageResponse = new PageResponse(users, page.getTotalPages(), users.size());
        return ResponseResult.ok(pageResponse);
    }

    @GetMapping("/{id}")
    public ResponseResult<?> getUser(@PathVariable Long id) {
        ApplicationUser user = userService.getUserById(id);
        UserInfoForUpdateResponse response = BeanCopyUtils.copyBean(user, UserInfoForUpdateResponse.class);
        List<RoleNameResponse> roles = BeanCopyUtils.copyBeanList(user.getRoles().stream().toList(), RoleNameResponse.class);
        response.setRoles(roles);
        return ResponseResult.ok(response);
    }

    @PostMapping
    public ResponseResult<?> createUser(@RequestBody CreateUserRequest request) {
        userService.createUser(request);
        return ResponseResult.ok();
    }

    @PutMapping("/{id}")
    public ResponseResult<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        userService.updateUser(id, request);
        return ResponseResult.ok();
    }

    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseResult.ok();
    }
}
