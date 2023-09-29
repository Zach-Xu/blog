package com.zach.blog.model;

import com.zach.blog.enums.Authority;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blog_role")
@Getter
@Setter
public class Role extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public Role() {

    }

    public Role(Authority authority) {
        this.authority = authority;
    }

}
