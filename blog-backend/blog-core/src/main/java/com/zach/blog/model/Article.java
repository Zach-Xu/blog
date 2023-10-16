package com.zach.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zach.blog.enums.PublishStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blog_article")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_article SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tag_article",
            joinColumns = {
                    @JoinColumn(name = "article_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "tag_id", referencedColumnName = "id")
            }
    )
    private Set<Tag> tags = new HashSet<>();

    private String thumbnail;

    private boolean pinned;

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private PublishStatus publishStatus;

    @Column(name = "view_count")
    private Long viewCount;

    @Column(name = "allowed_comment")
    private boolean allowedComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    @JsonIgnoreProperties({"authorities"})
    private ApplicationUser author;

    public void addTag(Tag tag){
        this.tags.add(tag);
    }

}
