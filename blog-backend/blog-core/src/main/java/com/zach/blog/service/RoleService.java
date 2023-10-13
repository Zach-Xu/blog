package com.zach.blog.service;

import com.zach.blog.enums.RoleName;
import com.zach.blog.model.Role;

public interface RoleService {

    Role findOrCreateRole(RoleName roleName);
}
