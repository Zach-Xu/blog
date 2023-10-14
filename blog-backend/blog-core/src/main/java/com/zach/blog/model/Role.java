package com.zach.blog.model;

import com.zach.blog.enums.RoleName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "blog_role")
@Setter
@Getter
@SQLDelete(sql = "UPDATE blog_role SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Role extends BaseEntity implements GrantedAuthority {

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)
    private RoleName roleName;

    @Column(name = "display_order")
    private Integer displayOrder;

    private boolean enable;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "role_menu",
            joinColumns = {
                    @JoinColumn(name = "role_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "menu_id",referencedColumnName = "id")
            }
    )
    private Set<Menu> menus = new HashSet<>();

    @Column(name = "created_by")
    private Long createdBy;

    public Role() {
        this.enable = true;
    }

    public Role(RoleName roleName) {
        this();
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName.toString();
    }

    public void addMenu(Menu menu){
        this.menus.add(menu);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return roleName.equals(role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleName);
    }


    @Override
    public String getAuthority() {
        return this.roleName.toString();
    }
}
