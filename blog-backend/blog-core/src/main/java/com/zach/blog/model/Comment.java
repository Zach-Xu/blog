package com.zach.blog.model;

import com.zach.blog.enums.CommentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "blog_comment")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_comment SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Comment extends BaseEntity {

    @Column(name = "type")
    @Enumerated(EnumType.ORDINAL)
    private CommentType type;

    @Column(columnDefinition = "VARCHAR(512)")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "root_comment_id", columnDefinition = "BIGINT COMMENT 'id of the root comment, -1 for root comment'")
    private Long rootCommentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private ApplicationUser user;

    @ManyToOne(fetch = FetchType.LAZY )
    @JoinColumn(name ="to_comment_id")
    private Comment toComment;

    @Column(name = "updated_by")
    private Long updatedBy;
}
