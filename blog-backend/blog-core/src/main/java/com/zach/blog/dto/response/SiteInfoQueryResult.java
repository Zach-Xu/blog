package com.zach.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class SiteInfoQueryResult {
    private LocalDateTime hostSince;
    private Long visitCount;
}
