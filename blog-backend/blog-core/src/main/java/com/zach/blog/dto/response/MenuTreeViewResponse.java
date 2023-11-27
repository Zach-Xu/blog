package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MenuTreeViewResponse {
    private Long id;
    private Long parentId;
    private Integer displayOrder;
    private String name;
    private String routerPath;
    private String permission;
    private String component;
    private Boolean enable;
    private List<MenuTreeViewResponse> subMenus = new ArrayList<>();

    public void addSubMenu(MenuTreeViewResponse subMenu){
        this.subMenus.add(subMenu);
    }
}
