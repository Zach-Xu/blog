package com.zach.blog.dto.response;

import com.zach.blog.model.Article;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
public class ArticleResponse {

    private Long id;

    private String title;

    private String summary;
    private CategoryResponse category;
    private List<TagResponse> tags;

    private String thumbnail;

    private Long viewCount;

    private LocalDateTime createdTime;

}
