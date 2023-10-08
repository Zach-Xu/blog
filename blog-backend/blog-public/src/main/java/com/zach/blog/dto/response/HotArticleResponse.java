package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HotArticleResponse {
    private Long id;

    private String title;

    private Long viewCount;
}
