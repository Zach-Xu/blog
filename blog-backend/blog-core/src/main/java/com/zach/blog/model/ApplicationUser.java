package com.zach.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.zach.blog.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blog_user")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_user SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class ApplicationUser extends BaseEntity{

    @Column
    private String username;

    @JsonIgnore
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_role",
            joinColumns ={
                    @JoinColumn(name = "user_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "role_id", referencedColumnName = "id")
            }
    )
    @JsonIncludeProperties({"roleName", "id"})
    private Set<Role> roles = new HashSet<>();

    private boolean enable = true;

    @Column(unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String avatar;

    @Enumerated(EnumType.ORDINAL)
    private Gender gender;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "updated_by")
    private Long updatedBy;

    public void addRole(Role role){
        this.roles.add(role);
    }

}
