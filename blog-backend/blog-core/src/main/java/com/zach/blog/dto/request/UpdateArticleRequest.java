package com.zach.blog.dto.request;

import com.zach.blog.enums.PublishStatus;

import java.util.List;

public record UpdateArticleRequest(String title,
                                   String content,
                                   String summary,
                                   Long categoryId,
                                   List<Long> tagIds,
                                   String thumbnail,
                                   boolean pinned,
                                   PublishStatus publishStatus,
                                   Long viewCount,
                                   boolean allowedComment) {
}
