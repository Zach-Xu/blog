package com.zach.blog.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blog_social")
@Getter
@Setter
public class SocialPlatform extends BaseEntity {
    private String name;
    private String url;
}
