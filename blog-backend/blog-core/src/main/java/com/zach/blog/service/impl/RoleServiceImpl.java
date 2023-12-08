package com.zach.blog.service.impl;

import com.zach.blog.dto.request.CreateRoleRequest;
import com.zach.blog.dto.request.UpdateRoleRequest;
import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.Menu;
import com.zach.blog.repository.MenuRepository;
import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.RoleService;
import com.zach.blog.model.Role;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.zach.blog.enums.code.ResourceNotFoundCode.ROLE_NOT_FOUND;
import static com.zach.blog.repository.RoleRepository.Specs.containsRoleName;
import static com.zach.blog.repository.RoleRepository.Specs.isEnable;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final MenuRepository menuRepository;

    @Override
    public Role findOrCreateRole(String roleName) {
        Optional<Role> userRoleOpt = roleRepository.findByRoleName(roleName);
        return userRoleOpt.orElseGet(() -> {
            Role role = new Role(roleName);
            return roleRepository.save(role);
        });
    }

    @Override
    public Page<Role> getRoles(Integer pageNum, Integer pageSize, String roleName, Boolean enable) {
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize);
        Specification<Role> specs = Specification.where(null);
        if (Strings.hasText(roleName)) {
            specs = specs.and(containsRoleName(roleName));
        }
        if (Objects.nonNull(enable)) {
            specs = specs.and(isEnable(enable));
        }
        Page<Role> rolePage = roleRepository.findAll(specs, pageRequest);
        return rolePage;
    }

    @Override
    public void changeRoleStatus(Long id, boolean enable) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ROLE_NOT_FOUND));
        role.setEnable(enable);
        roleRepository.save(role);
    }

    @Override
    public Role createRole(CreateRoleRequest createRoleRequest) {
        Role role = new Role();
        String roleName = createRoleRequest.roleName();

        role.setRoleName(roleName);
        role.setEnable(createRoleRequest.enable());
        role.setDescription(createRoleRequest.description());

        Set<Menu> menus = createRoleRequest.menuIds().stream()
                .map(id -> menuRepository.getReferenceById(id))
                .collect(Collectors.toSet());
        role.setMenus(menus);
        return roleRepository.save(role);
    }

    @Override
    public void updateRole(Long id, UpdateRoleRequest request) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ROLE_NOT_FOUND));
        role.setRoleName(request.roleName());
        role.setDescription(request.description());
        role.setEnable(request.enable());

        Set<Menu> menus = request.menuIds().stream()
                .map(menuId -> menuRepository.getReferenceById(menuId))
                .collect(Collectors.toSet());
        role.setMenus(menus);

        roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ROLE_NOT_FOUND));
        role.setDeleted(true);
        roleRepository.save(role);
    }

    @Override
    public List<Role> getAllActiveRoles() {
        return roleRepository.findAllByEnable(true);
    }

    @Override
    public Role getRoleDetails(Long roleId) {
        return roleRepository.findRoleWithMenus(roleId).orElseThrow(() -> new ResourceNotFoundException(ROLE_NOT_FOUND));
    }

}
