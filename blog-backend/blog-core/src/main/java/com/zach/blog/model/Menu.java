package com.zach.blog.model;

import com.zach.blog.enums.MenuType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Objects;

@Builder
@Entity
@Table(name = "blog_menu")
@Getter
@Setter
@AllArgsConstructor
public class Menu extends BaseEntity implements GrantedAuthority {

    @Column(name = "menu_name")
    private String name;
    private Long parentId;

    @Column(name = "display_order")
    private Integer displayOrder;
    @Column(name = "router_path")
    private String routerPath;

    private String component;

    @Column(name="menu_type")
    @Enumerated(EnumType.ORDINAL)
    private MenuType menuType;

    private boolean visible;

    private boolean enable;

    private String permission;

    private Long updatedBy;

    public Menu() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return Objects.equals(name, menu.name) && Objects.equals(parentId, menu.parentId) && Objects.equals(routerPath, menu.routerPath) && Objects.equals(component, menu.component) && menuType == menu.menuType && Objects.equals(permission, menu.permission);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, parentId, routerPath, component, menuType, permission);
    }

    @Override
    public String getAuthority() {
        return this.permission;
    }
}
