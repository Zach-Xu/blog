package com.zach.blog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OutboundLinkResponse {
    private Long id;

    private String name;

    private String description;

    private String url;

    private String logo;
}
