package com.zach.blog.dto.request;

import com.zach.blog.enums.CommentType;

public record CommentRequest(Long articleId, CommentType type, String content, Long rootCommentId, Long toCommentId){
}
