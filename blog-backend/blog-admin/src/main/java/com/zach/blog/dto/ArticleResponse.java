package com.zach.blog.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ArticleResponse {
    private Long id;
    private String title;
    private String summary;
    private LocalDateTime createdTime;
}
