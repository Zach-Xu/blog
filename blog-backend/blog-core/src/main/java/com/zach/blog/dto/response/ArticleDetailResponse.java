package com.zach.blog.dto.response;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.zach.blog.model.Category;
import com.zach.blog.model.Tag;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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

    private Boolean pinned;

    private Boolean allowedComment;

    @JsonIncludeProperties({ "id", "name" })
    private Category category;

    @JsonIncludeProperties({ "id", "name" })
    private List<Tag> tags;
}
