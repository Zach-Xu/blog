package com.zach.blog.service.impl;

import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.RoleService;
import com.zach.blog.enums.Authority;
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
    public Role findOrCreateRole(Authority authority) {
        Optional<Role> userRoleOpt = roleRepository.findByAuthority(authority);
        return userRoleOpt.orElseGet(() -> {
            Role role = new Role(authority);
            return roleRepository.save(role);
        });
    }

    @Override
    public void createRoles(List<Role> roles) {
        roleRepository.saveAll(roles);
    }
}
