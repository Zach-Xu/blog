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

    /**
     *  Constructor for sub article comments
     * */
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

    /**
     *  Constructor for root article comments
     * */
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

    /**
     *  Constructor for root contact comments
     * */
    public CommentQueryResult(Long commentId, Long rootCommentId, String content, LocalDateTime createdTime,  String username, String userAvatar ) {
        this.commentId = commentId;
        this.content = content;
        this.createdTime = createdTime;
        this.rootCommentId = rootCommentId;
        this.username = username;
        this.userAvatar = userAvatar;
    }

    /**
     *  Constructor for sub contact comments
     * */
    public CommentQueryResult(Long commentId, Long rootCommentId, String content, LocalDateTime createdTime, String username, String userAvatar, String toUsername) {
        this.commentId = commentId;
        this.content = content;
        this.createdTime = createdTime;
        this.rootCommentId = rootCommentId;
        this.username = username;
        this.toUsername = toUsername;
        this.userAvatar = userAvatar;
    }

    /**
     *  Constructor for latest comments
     * */
    public CommentQueryResult(String content, LocalDateTime createdTime, String username, String userAvatar) {
        this.content = content;
        this.createdTime = createdTime;
        this.username = username;
        this.userAvatar = userAvatar;
    }
}
