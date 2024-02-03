package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class FeaturedArticleResponse {
    private Long id;

    private boolean pinned;

    private CategoryResponse category;

    private List<TagResponse> tags;

    private String title;

    private String summary;

    private LocalDateTime createdTime;

    private String thumbnail;
}
