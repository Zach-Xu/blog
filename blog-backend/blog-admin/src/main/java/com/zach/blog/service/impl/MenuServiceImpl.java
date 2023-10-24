package com.zach.blog.service.impl;

import com.zach.blog.dto.MenuResponse;
import com.zach.blog.dto.response.MenuTreeViewResponse;
import com.zach.blog.enums.MenuType;
import com.zach.blog.exception.SystemException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;
import com.zach.blog.model.Role;
import com.zach.blog.repository.MenuRepository;
import com.zach.blog.repository.RoleRepository;
import com.zach.blog.service.MenuService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MenuServiceImpl implements MenuService {
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
                .flatMap(role -> role.getMenus().stream()).sorted(Comparator.comparing(Menu::getDisplayOrder))
                .toList();

        List<MenuType> menuTypes = Arrays.asList(MenuType.CONTENT, MenuType.MENU);

        // For each root menu, fetch its sub menus as well
        return rootMenus.stream().map(menu -> {
            List<Menu> subMenus = menuRepository.findSubMenusByTypes(menu.getId(), menuTypes);
            MenuResponse menuResponse = new MenuResponse();
            menuResponse.setMenu(menu);
            menuResponse.setSubMenus(subMenus);
            return menuResponse;
        }).collect(Collectors.toList());
    }

    @Override
    public List<Menu> getAllMenus() {
        Sort sort = Sort.by("parentId").ascending().and(Sort.by("displayOrder").ascending());
        return menuRepository.findAll(sort);
    }

    @Override
    public void createMenu(Menu menu) {
        if (menuRepository.findByName(menu.getName()).isPresent()) {
            // ToDo: refactor exception handling
            throw new SystemException();
        }
        menuRepository.save(menu);
    }

    @Override
    public void updateMenu(Long id, Menu menu) {
        // Menu can not be its own parent
        if (Objects.equals(menu.getParentId(), id)) {
            throw new SystemException();
        }
        // ToDo: refactor exception handling
        Menu menuToUpdate = menuRepository.findById(id).orElseThrow(SystemException::new);

        BeanUtils.copyProperties(menu, menuToUpdate);
        menuRepository.save(menuToUpdate);
    }

    @Override
    public Menu getMenuById(Long id) {
        // ToDo: refactor exception handling
        return menuRepository.findById(id).orElseThrow(SystemException::new);
    }

    @Override
    public void deleteMenu(Long id) {
        // The menu about to delete should not have any sub menus
        if (menuRepository.existsByParentId(id)) {
            // ToDo: refactor exception handling
            throw new SystemException();
        }

        Menu menu = menuRepository.findById(id).orElseThrow(SystemException::new);
        menu.setDeleted(true);
        menuRepository.save(menu);
    }

    @Override
    public List<MenuTreeViewResponse> getMenusInTreeView() {
        Sort sort = Sort.by("displayOrder");
        List<Menu> menus = menuRepository.findAll(sort);

        Map<Long, List<Menu>> menuMap = menus.stream()
                .collect(Collectors.groupingBy(Menu::getParentId));

        // By default, root menus have parentId -1L
        return convertToTree(-1L, menuMap);
    }

    @Override
    public List<MenuTreeViewResponse> getRoleMenusInTreeView(Long roleId) {
        Role role = roleRepository.findById(roleId).orElseThrow(SystemException::new);
        Map<Long, List<Menu>> menuMap = role.getMenus().stream()
                .collect(Collectors.groupingBy(Menu::getParentId));

        return convertToTree(-1L, menuMap);
    }

    private List<MenuTreeViewResponse> convertToTree(Long rootMenuId, Map<Long, List<Menu>> map) {
        List<Menu> subMenus = map.get(rootMenuId);
        if (Objects.isNull(subMenus)) {
            return null;
        }
        List<MenuTreeViewResponse> menuTree = BeanCopyUtils.copyBeanList(subMenus, MenuTreeViewResponse.class);
        if (subMenus.size() != 0) {
            menuTree.forEach(
                    menu -> menu.setSubMenus(convertToTree(menu.getId(), map))
            );
        }
        return menuTree;
    }

}
