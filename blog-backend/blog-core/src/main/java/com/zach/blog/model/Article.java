package com.zach.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zach.blog.enums.DeleteFlag;
import com.zach.blog.enums.PublishStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blog_article")
@Getter
@Setter
public class Article extends BaseEntity {

    private String title;

    @Column(columnDefinition = "longtext")
    private String content;

    @Column(columnDefinition = "varchar(1024)")
    private String summary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "category_id"
    )
    private Category category;

    private String thumbnail;

    private boolean pinned;

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private PublishStatus publishStatus;

    @Column(name = "view_count")
    private Long viewCount;

    @Column(name = "allowed_comment")
    private boolean allowedComment;

    @Column(name = "delete_flag")
    @Enumerated(EnumType.ORDINAL)
    private DeleteFlag deleteFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    @JsonIgnoreProperties({"authorities"})
    private ApplicationUser author;

    public Article() {
        this.deleteFlag = DeleteFlag.LIVE;
    }
}
