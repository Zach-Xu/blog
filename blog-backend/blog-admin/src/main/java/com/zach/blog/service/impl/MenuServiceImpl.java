package com.zach.blog.service.impl;

import com.zach.blog.dto.MenuResponse;
import com.zach.blog.enums.MenuType;
import com.zach.blog.exception.SystemException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;
import com.zach.blog.model.Role;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.repository.MenuRepository;
import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MenuServiceImpl implements MenuService {
    private final ApplicationUserRepository userRepository;
    private final MenuRepository menuRepository;
    private final RoleRepository roleRepository;

    @Override
    public List<MenuResponse> getUserMenus(ApplicationUser user) {
        List<Long> roleIds = user.getRoles().stream().map(Role::getId).toList();

        // Because of uni-directional association, menus can only be fetched via role
        List<Role> roles = roleIds.stream()
                .map(id -> roleRepository.findRoleAndRootMenusById(id).orElseThrow(SystemException::new))
                .toList();

        List<Menu> rootMenus = roles.stream()
                .flatMap(role -> role.getMenus().stream())
                .toList();

        List<MenuType> menuTypes = Arrays.asList(MenuType.CONTENT, MenuType.MENU);
        return rootMenus.stream().map(menu -> {
            List<Menu> subMenus = menuRepository.findSubMenus(menu.getId(), menuTypes);
            MenuResponse menuResponse = new MenuResponse();
            menuResponse.setMenu(menu);
            menuResponse.setSubMenus(subMenus);
            return menuResponse;
        }).collect(Collectors.toList());
    }
}
