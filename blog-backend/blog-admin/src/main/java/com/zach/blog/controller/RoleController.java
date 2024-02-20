package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.request.ChangeRoleStatusRequest;
import com.zach.blog.dto.response.*;
import com.zach.blog.dto.request.CreateRoleRequest;
import com.zach.blog.dto.request.UpdateRoleRequest;
import com.zach.blog.model.Menu;
import com.zach.blog.model.Role;
import com.zach.blog.service.RoleService;
import com.zach.blog.utils.BeanCopyUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:query')")
    @GetMapping
    public ResponseResult<?> getRoles(@RequestParam(defaultValue = "0") Integer pageNum,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(required = false) String roleName, @RequestParam(required = false) Boolean enable) {
        Page<Role> page = roleService.getRoles(pageNum, pageSize, roleName, enable);
        int totalPages = page.getTotalPages();
        List<Role> roles = page.getContent();
        List<RoleResponse> roleResponse = BeanCopyUtils.copyBeanList(roles, RoleResponse.class);
        PageResponse pageResponse = new PageResponse(roleResponse, totalPages, roles.size());
        return ResponseResult.ok(pageResponse);
    }

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:query')")
    @GetMapping("/all")
    public ResponseResult<?> getAllActiveRoles() {
        List<Role> roles = roleService.getAllActiveRoles();
        List<RoleNameResponse> roleResponse = BeanCopyUtils.copyBeanList(roles, RoleNameResponse.class);
        return ResponseResult.ok(roleResponse);
    }

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:query')")
    @GetMapping("/{id}")
    public ResponseResult<?> getRoleDetails(@PathVariable Long id){
        Role role = roleService.getRoleDetails(id);
        RoleDetailsResponse response = BeanCopyUtils.copyBean(role, RoleDetailsResponse.class);
        List<Long> menuIds = role.getMenus().stream().map(Menu::getId).collect(Collectors.toList());
        response.setMenuIds(menuIds);
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 10)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:edit')")
    @Validate
    @PutMapping("/{id}")
    public ResponseResult<?> updateRole(@PathVariable Long id, @Valid @RequestBody UpdateRoleRequest request, BindingResult bindingResult) {
        roleService.updateRole(id, request);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 10)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:edit')")
    @PutMapping("/{id}/status")
    public ResponseResult<?> changeRoleStatus(@PathVariable Long id, @RequestBody ChangeRoleStatusRequest request) {
        roleService.changeRoleStatus(id, request.enable());
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:add')")
    @Validate
    @PostMapping
    public ResponseResult<?> createRole(@Valid @RequestBody CreateRoleRequest createRoleRequest,
            BindingResult bindingResult) {
        Role role = roleService.createRole(createRoleRequest);
        RoleResponse response = BeanCopyUtils.copyBean(role, RoleResponse.class);
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system','system:role','system:role:remove')")
    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseResult.ok();
    }

}
