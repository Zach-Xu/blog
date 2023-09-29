package com.zach.blog.service;

import com.zach.blog.enums.Authority;
import com.zach.blog.model.Role;

import java.util.List;

public interface RoleService {

    Role findOrCreateRole(Authority authority);

    void createRoles(List<Role> roles);
}
