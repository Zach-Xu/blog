package com.zach.blog.dto.response;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.zach.blog.model.Category;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ArticleDetailResponse {

    private Long id;

    private String title;

    private String summary;

    private String content;

    private String thumbnail;

    private Long viewCount;

    private LocalDateTime createdTime;

    @JsonIncludeProperties({"id", "name"})
    private Category category;
}
