package com.zach.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TagStatsResponse {
    private Long id;
    private String tagName;
    private Long articleCount;
}
