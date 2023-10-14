package com.zach.blog.controller;

import com.zach.blog.dto.MenuResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/user-menu")
    public ResponseResult<?> getCurrentUserMenu(@AuthenticationPrincipal ApplicationUser user){
        List<MenuResponse> userMenus = menuService.getUserMenus(user);
        return ResponseResult.ok(userMenus);
    }
}
