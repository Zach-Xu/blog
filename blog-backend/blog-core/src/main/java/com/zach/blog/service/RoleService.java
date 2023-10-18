package com.zach.blog.service;

import com.zach.blog.dto.request.CreateRoleRequest;
import com.zach.blog.dto.request.UpdateRoleRequest;
import com.zach.blog.enums.RoleName;
import com.zach.blog.model.Role;
import org.springframework.data.domain.Page;


public interface RoleService {

    Role findOrCreateRole(String roleName);

    Page<Role> getRoles(Integer pageNum, Integer pageSize, String roleName, Boolean enable);

    void changeRoleStatus(Long id, boolean enable);

    void createRole(CreateRoleRequest createRoleRequest);

    void updateRole(Long id, UpdateRoleRequest request);

    void deleteRole(Long id);
}
