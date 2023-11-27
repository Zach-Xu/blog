package com.zach.blog.service;

import com.zach.blog.dto.response.MenuResponse;
import com.zach.blog.dto.response.MenuTreeViewResponse;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;

import java.util.List;

public interface MenuService {
    List<MenuResponse> getUserMenus(ApplicationUser user);

    List<Menu> getAllMenus();

    void createMenu(Menu menu);

    void updateMenu(Long id, Menu menu);

    Menu getMenuById(Long id);

    void deleteMenu(Long id);

    List<MenuTreeViewResponse> getMenusInTreeView(String name, Boolean enable);

    List<MenuTreeViewResponse> getRoleMenusInTreeView(Long roleId);

    void changeMenuStatus(Long id, Boolean enable, Long userId);
}
