package com.zach.blog.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "blog_category")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_category SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Category extends BaseEntity{

    private String name;

    private String description;

    @Column(columnDefinition = "BIGINT COMMENT 'id of parent category, -1 for root category'")
    private Long pid;

    private boolean enable;

    private Long createdBy;

    private Long updatedBy;

}
