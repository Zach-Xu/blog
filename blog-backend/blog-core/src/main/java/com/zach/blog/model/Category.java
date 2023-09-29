package com.zach.blog.model;

import com.zach.blog.enums.DeleteFlag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blog_category")
@Getter
@Setter
public class Category extends BaseEntity{

    private String name;

    private String description;

    @Column(columnDefinition = "BIGINT COMMENT 'id of parent category, -1 for root category'")
    private Long pid;

    private boolean enable;

    private Long createdBy;

    private Long updateBy;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "delete_flag")
    private DeleteFlag deleteFlag;
}
