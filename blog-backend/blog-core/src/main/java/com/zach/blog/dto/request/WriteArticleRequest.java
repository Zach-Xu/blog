package com.zach.blog.dto.request;

import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Tag;

import java.util.List;

public record WriteArticleRequest(String title, String thumbnail, String content, Long categoryId, List<Long> tagIds, PublishStatus publishStatus, String summary) {
}
