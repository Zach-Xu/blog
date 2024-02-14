package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommentQueryResult {

    private Long articleId;
    private Long commentId;
    private Long toCommentId;
    private String content;
    private Long userId;
    private LocalDateTime createdTime;
    private Long rootCommentId;
    private String username;
    private String toUsername;
    private Long toUserId;
    private String userAvatar;

    private List<CommentQueryResult> subComments;

    public CommentQueryResult(Long articleId, Long commentId, Long toCommentId, String content, Long userId, Long toUserId, LocalDateTime createdTime, Long rootCommentId, String username, String toUsername,
                              String userAvatar) {
        this.articleId = articleId;
        this.commentId = commentId;
        this.toCommentId = toCommentId;
        this.content = content;
        this.userId = userId;
        this.toUserId = toUserId;
        this.createdTime = createdTime;
        this.rootCommentId = rootCommentId;
        this.username = username;
        this.toUsername = toUsername;
        this.userAvatar = userAvatar;
    }

    public CommentQueryResult(Long articleId, Long commentId, String content, Long userId, LocalDateTime createdTime, Long rootCommentId, String username, String userAvatar) {
        this.articleId = articleId;
        this.commentId = commentId;
        this.content = content;
        this.userId = userId;
        this.createdTime = createdTime;
        this.rootCommentId = rootCommentId;
        this.username = username;
        this.userAvatar = userAvatar;
    }

    public CommentQueryResult(Long articleId, Long commentId, String content, Long userId, LocalDateTime createdTime, Long rootCommentId, String username) {
        this.articleId = articleId;
        this.commentId = commentId;
        this.content = content;
        this.userId = userId;
        this.createdTime = createdTime;
        this.rootCommentId = rootCommentId;
        this.username = username;
    }

    public CommentQueryResult(String content, LocalDateTime createdTime, String username, String userAvatar) {
        this.content = content;
        this.createdTime = createdTime;
        this.username = username;
        this.userAvatar = userAvatar;
    }
}
