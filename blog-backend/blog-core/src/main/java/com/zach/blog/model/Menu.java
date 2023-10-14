package com.zach.blog.model;

import com.zach.blog.enums.MenuStatus;
import com.zach.blog.enums.MenuType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "blog_menu")
@Getter
@Setter
public class Menu extends BaseEntity {

    @Column(name = "menu_name")
    private String name;

    private Long parentId;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "router_path")
    private String routerPath;

    private String component;

    private boolean frame;

    @Column(name="menu_type")
    @Enumerated(EnumType.ORDINAL)
    private MenuType menuType;

    private boolean visible;

    @Enumerated(EnumType.ORDINAL)
    private MenuStatus status;

    private String permission;

    private String icon;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return Objects.equals(name, menu.name) && Objects.equals(parentId, menu.parentId) && menuType == menu.menuType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, parentId, menuType);
    }
}
