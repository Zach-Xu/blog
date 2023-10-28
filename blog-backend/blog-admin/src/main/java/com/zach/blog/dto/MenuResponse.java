package com.zach.blog.dto;

import com.zach.blog.enums.MenuStatus;
import com.zach.blog.enums.MenuType;
import com.zach.blog.model.Menu;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenuResponse {
    private Long id;

    private String name;

    private Long parentId;

    private Integer displayOrder;

    private String routerPath;

    private String component;

    private MenuType menuType;

    private String permission;

    private String icon;

    private List<Menu> subMenus;
}
