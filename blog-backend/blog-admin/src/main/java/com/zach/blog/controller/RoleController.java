package com.zach.blog.controller;

import com.zach.blog.dto.ChangeRoleStatusRequest;
import com.zach.blog.dto.RoleNameResponse;
import com.zach.blog.dto.request.CreateRoleRequest;
import com.zach.blog.dto.RoleResponse;
import com.zach.blog.dto.request.UpdateRoleRequest;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.Role;
import com.zach.blog.service.RoleService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    public ResponseResult<?> getRoles(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam(required = false) String roleName, @RequestParam(required = false) Boolean enable){
        Page<Role> page = roleService.getRoles(pageNum, pageSize, roleName, enable);
        int totalPages = page.getTotalPages();
        List<Role> roles = page.getContent();
        List<RoleResponse> roleResponse = BeanCopyUtils.copyBeanList(roles, RoleResponse.class);
        PageResponse pageResponse = new PageResponse(roleResponse, totalPages, roles.size());
        return ResponseResult.ok(pageResponse);
    }

    @GetMapping("/all")
    public ResponseResult<?> getAllActiveRoles(){
        List<Role> roles = roleService.getAllActiveRoles();
        List<RoleNameResponse> roleResponse = BeanCopyUtils.copyBeanList(roles, RoleNameResponse.class);
        return ResponseResult.ok(roleResponse);
    }

    @PostMapping("/{id}")
    public ResponseResult<?> updateRole(@PathVariable Long id, @RequestBody UpdateRoleRequest request){
        roleService.updateRole(id, request);
        return ResponseResult.ok();
    }

    @PutMapping("/{id}")
    public ResponseResult<?> changeRoleStatus(@PathVariable Long id, @RequestBody ChangeRoleStatusRequest request){
        roleService.changeRoleStatus(id, request.enable());
        return ResponseResult.ok();
    }

    @PostMapping
    public ResponseResult<?> createRole(@RequestBody CreateRoleRequest createRoleRequest){
        roleService.createRole(createRoleRequest);
        return ResponseResult.ok();
    }

    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteRole(@PathVariable Long id){
        roleService.deleteRole(id);
        return ResponseResult.ok();
    }



}
