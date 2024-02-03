package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SiteInfoResponse {
    private Long articleCount;
    private LocalDateTime hostSince;
    private Long visitCount;
}
