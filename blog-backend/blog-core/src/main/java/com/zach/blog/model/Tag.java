package com.zach.blog.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "blog_tag")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_tag SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Tag extends BaseEntity{
    private String name;
    private String description;
    private Long createdBy;
    private Long updateBy;
}
