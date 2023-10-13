package com.zach.blog.service.impl;

import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.RoleService;
import com.zach.blog.enums.RoleName;
import com.zach.blog.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role findOrCreateRole(RoleName roleName) {
        Optional<Role> userRoleOpt = roleRepository.findByRoleName(roleName);
        return userRoleOpt.orElseGet(() -> {
            Role role = new Role(roleName);
            return roleRepository.save(role);
        });
    }
}
