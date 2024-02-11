package com.zach.blog.dto.request;

import com.zach.blog.enums.CommentType;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(
        @NotNull(message = "Please specify the article you want to comment")
        Long articleId,

        CommentType type,

        String content,

        Long rootCommentId,

        Long toCommentId){
}
