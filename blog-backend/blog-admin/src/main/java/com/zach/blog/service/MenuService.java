package com.zach.blog.service;

import com.zach.blog.dto.MenuResponse;
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

    List<MenuTreeViewResponse> getMenusInTreeView();

    List<MenuTreeViewResponse> getRoleMenusInTreeView(Long roleId);
}
