package com.zach.blog.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "blog_site")
@Getter
@Setter
public class SiteInfo extends BaseEntity{

    @OneToOne(fetch = FetchType.LAZY)
    private ApplicationUser owner;

    @OneToMany
    private List<SocialPlatform> socials;

    private LocalDateTime hostSince;

    private Long visitCount;

}
