package com.zach.blog.service;

import com.zach.blog.dto.MenuResponse;
import com.zach.blog.model.ApplicationUser;

import java.util.List;

public interface MenuService {
    List<MenuResponse> getUserMenus(ApplicationUser user);
}
