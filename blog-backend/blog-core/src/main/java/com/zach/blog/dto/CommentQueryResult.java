package com.zach.blog.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommentQueryResult {

    private Long articleId;
    private Long commentId;
    private String content;
    private Long userId;
    private LocalDateTime createdTime;
    private Long rootCommentId;
    private String username;
    private String toUsername;

    private List<CommentQueryResult> subComments;

    public CommentQueryResult(Long articleId, Long commentId, String content, Long userId, LocalDateTime createdTime, Long rootCommentId, String username, String toUsername) {
        this.articleId = articleId;
        this.commentId = commentId;
        this.content = content;
        this.userId = userId;
        this.createdTime = createdTime;
        this.rootCommentId = rootCommentId;
        this.username = username;
        this.toUsername = toUsername;
    }
}
