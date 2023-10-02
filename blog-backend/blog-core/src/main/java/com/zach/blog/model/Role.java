package com.zach.blog.model;

import com.zach.blog.enums.Authority;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "blog_role")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_role SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Role extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public Role() {

    }

    public Role(Authority authority) {
        this.authority = authority;
    }

}
