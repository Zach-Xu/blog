package com.zach.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryStatsResponse {

    private Long id;
    private String categoryName;
    private Long articleCount;
}
