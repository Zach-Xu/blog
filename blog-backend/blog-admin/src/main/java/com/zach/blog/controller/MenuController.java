package com.zach.blog.controller;

import com.zach.blog.dto.response.MenuResponse;
import com.zach.blog.dto.response.MenuTreeViewResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;
import com.zach.blog.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/user-menu")
    public ResponseResult<?> getCurrentUserMenus(@AuthenticationPrincipal ApplicationUser user) {
        List<MenuResponse> menus = menuService.getUserMenus(user);
        return ResponseResult.ok(menus);
    }

    @GetMapping("/{id}")
    public ResponseResult<?> getMenuById(@PathVariable Long id){
        Menu menu = menuService.getMenuById(id);
        return ResponseResult.ok(menu);
    }

    @GetMapping("/all")
    public ResponseResult<?> getAllMenus() {
        List<Menu> menus = menuService.getAllMenus();
        return ResponseResult.ok(menus);
    }

    @GetMapping("/all/tree")
    public ResponseResult<?> getAllMenusInTreeView(){
        List<MenuTreeViewResponse> menusInTreeView = menuService.getMenusInTreeView();
        return ResponseResult.ok(menusInTreeView);
    }

    @GetMapping("/tree")
    public ResponseResult<?> getRoleMenusInTreeView(@RequestParam Long roleId){
        List<MenuTreeViewResponse> roleMenusInTreeView = menuService.getRoleMenusInTreeView(roleId);
        return ResponseResult.ok(roleMenusInTreeView);
    }

    @PostMapping
    public ResponseResult<?> createMenu(@RequestBody Menu menu) {
        menuService.createMenu(menu);
        return ResponseResult.ok();
    }

    @PutMapping("/{id}")
    public ResponseResult<?> updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        menuService.updateMenu(id, menu);
        return ResponseResult.ok();
    }

    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteMenu(@PathVariable Long id){
        menuService.deleteMenu(id);
        return ResponseResult.ok();
    }
}
