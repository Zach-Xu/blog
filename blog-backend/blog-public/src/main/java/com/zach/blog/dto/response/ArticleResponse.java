package com.zach.blog.dto.response;

import com.zach.blog.model.Article;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
public class ArticleResponse {

    private Long id;

    private String title;

    private String summary;

    private String categoryName;

    private String thumbnail;

    private Long viewCount;

    private LocalDateTime createdTime;

    public ArticleResponse() {

    }

    public ArticleResponse(Article article) {
        if (Objects.nonNull(article)) {
            this.categoryName = article.getCategory().getName();
        }
    }
}
