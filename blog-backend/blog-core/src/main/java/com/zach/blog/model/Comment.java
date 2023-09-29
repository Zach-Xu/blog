package com.zach.blog.model;

import com.zach.blog.enums.CommentType;
import com.zach.blog.enums.DeleteFlag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blog_comment")
@Getter
@Setter
public class Comment extends BaseEntity {

    @Column(name = "type")
    @Enumerated(EnumType.ORDINAL)
    private CommentType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "root_comment_id", columnDefinition = "BIGINT COMMENT 'id of the root comment, -1 for root comment'")
    private Long rootCommentId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private ApplicationUser toCommentUser;

    @Column(name = "to_comment_id")
    private Long toCommentId;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "updated_by")
    private Long updatedBy;

    @Column(name = "delete_flag")
    @Enumerated(EnumType.ORDINAL)
    private DeleteFlag deleteFlag;

    public Comment(){
        this.deleteFlag = DeleteFlag.LIVE;
    }
}
