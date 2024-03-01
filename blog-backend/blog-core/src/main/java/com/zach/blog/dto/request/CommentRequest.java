package com.zach.blog.dto.request;

import com.zach.blog.enums.CommentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(
        Long articleId,

        @NotBlank(message = "Comment can not be empty")
        String content,

        String tempUsername,

        @NotNull(message = "Please specify to which comment you want to reply")
        Long rootCommentId,

        Long toCommentId){
}
