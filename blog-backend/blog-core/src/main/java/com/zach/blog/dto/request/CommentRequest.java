package com.zach.blog.dto.request;

import com.zach.blog.enums.CommentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(
        @NotNull(message = "Please specify the article you want to comment")
        Long articleId,

        @NotNull(message = "Please specify the type of the comment")
        CommentType type,

        @NotBlank(message = "Comment can not be empty")
        String content,

        @NotNull(message = "Please specify to which comment you want to reply")
        Long rootCommentId,

        Long toCommentId){
}
