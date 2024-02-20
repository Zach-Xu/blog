package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.request.ChangeStatusRequest;
import com.zach.blog.dto.response.MenuResponse;
import com.zach.blog.dto.response.MenuTreeViewResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;
import com.zach.blog.model.SessionUser;
import com.zach.blog.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final MenuService menuService;

    @AccessLimit(maxCount = 15)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:query')")
    @GetMapping("/user-menu")
    public ResponseResult<?> getCurrentUserMenus(@AuthenticationPrincipal SessionUser user) {
        List<MenuResponse> menus = menuService.getUserMenus(user.getId());
        return ResponseResult.ok(menus);
    }

    @AccessLimit(maxCount = 10)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:query')")
    @GetMapping("/{id}")
    public ResponseResult<?> getMenuById(@PathVariable Long id) {
        Menu menu = menuService.getMenuById(id);
        return ResponseResult.ok(menu);
    }

    @AccessLimit(maxCount = 20)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:query')")
    @GetMapping("/all")
    public ResponseResult<?> getAllMenus() {
        List<Menu> menus = menuService.getAllMenus();
        return ResponseResult.ok(menus);
    }

    @AccessLimit(maxCount = 20)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:query')")
    @GetMapping("/all/tree")
    public ResponseResult<?> getAllMenusInTreeView(@RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean enable) {
        List<MenuTreeViewResponse> menusInTreeView = menuService.getMenusInTreeView(name, enable);
        return ResponseResult.ok(menusInTreeView);
    }

    @AccessLimit(maxCount = 20)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:query')")
    @GetMapping("/tree")
    public ResponseResult<?> getRoleMenusInTreeView(@RequestParam Long roleId) {
        List<MenuTreeViewResponse> roleMenusInTreeView = menuService.getRoleMenusInTreeView(roleId);
        return ResponseResult.ok(roleMenusInTreeView);
    }

    @AccessLimit(maxCount = 2)
    @PreAuthorize("hasAnyAuthority('system')")
    @PostMapping
    public ResponseResult<?> createMenu(@RequestBody Menu menu) {
        menuService.createMenu(menu);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:edit')")
    @PutMapping("/{id}")
    public ResponseResult<?> updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        menuService.updateMenu(id, menu);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:edit')")
    @Validate
    @PutMapping("/{id}/status")
    public ResponseResult<?> updateMenuStatus(@PathVariable Long id, @AuthenticationPrincipal SessionUser user,
            @RequestBody @Valid ChangeStatusRequest request, BindingResult bindingResult) {
        menuService.changeMenuStatus(id, request.enable(), user.getId());
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @PreAuthorize("hasAnyAuthority('system', 'system:menu', 'system:menu:remove')")
    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseResult.ok();
    }
}
