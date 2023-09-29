package com.zach.blog.model;

import com.zach.blog.enums.DeleteFlag;
import com.zach.blog.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blog_user")
@Getter
@Setter
public class ApplicationUser extends BaseEntity{

    private String username;

    private String nickname;

    private String password;

    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns ={
                    @JoinColumn(name = "user_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "role_id", referencedColumnName = "id")
            }
    )
    private Set<Role> authorities = new HashSet<>();

    private boolean enable;

    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String avatar;

    @Enumerated(EnumType.ORDINAL)
    private Gender gender;

    @Column(name = "delete_flag")
    @Enumerated(EnumType.ORDINAL)
    private DeleteFlag deleteFlag;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "updated_by")
    private Long updatedBy;

    public void addAuthority(Role role){
        this.authorities.add(role);
    }

}
