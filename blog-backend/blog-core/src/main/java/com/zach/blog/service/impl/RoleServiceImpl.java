package com.zach.blog.service.impl;

import com.zach.blog.dto.request.CreateRoleRequest;
import com.zach.blog.dto.request.UpdateRoleRequest;
import com.zach.blog.exception.SystemException;
import com.zach.blog.model.Menu;
import com.zach.blog.repository.MenuRepository;
import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.RoleService;
import com.zach.blog.model.Role;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
        Sort sort = Sort.by("displayOrder");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
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
        // Todo: refactor exception handling
        Role role = roleRepository.findById(id).orElseThrow(SystemException::new);
        role.setEnable(enable);
        roleRepository.save(role);
    }

    @Override
    public void createRole(CreateRoleRequest createRoleRequest) {
        Role role = new Role();
        String roleName = createRoleRequest.roleName();
        if (!roleName.startsWith("ROLE_")) {
            // Todo: refactor exception handling
            throw new SystemException();
        }
        role.setRoleName(roleName);
        role.setDisplayOrder(createRoleRequest.displayOrder());
        role.setEnable(createRoleRequest.enable());
        role.setDescription(createRoleRequest.description());

        Set<Menu> menus = createRoleRequest.menuIds().stream()
                .map(id -> menuRepository.getReferenceById(id))
                .collect(Collectors.toSet());
        role.setMenus(menus);
        // Todo: refactor spring security config to allow RBAC
        roleRepository.save(role);
    }

    @Override
    public void updateRole(Long id, UpdateRoleRequest request) {
        // ToDo: refactor exception handling
        Role role = roleRepository.findById(id).orElseThrow(SystemException::new);
        role.setRoleName(request.roleName());
        role.setDescription(request.description());
        role.setDisplayOrder(request.displayOrder());
        role.setEnable(request.enable());

        Set<Menu> menus = request.menuIds().stream()
                .map(menuId -> menuRepository.getReferenceById(id))
                .collect(Collectors.toSet());
        role.setMenus(menus);

        roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        // ToDo: refactor exception handling
        Role role = roleRepository.findById(id).orElseThrow(SystemException::new);
        role.setDeleted(true);
        roleRepository.save(role);
    }

    @Override
    public List<Role> getAllActiveRoles() {
        Sort sort = Sort.by("displayOrder");
        return roleRepository.findAllByEnable(true, sort);
    }

}
