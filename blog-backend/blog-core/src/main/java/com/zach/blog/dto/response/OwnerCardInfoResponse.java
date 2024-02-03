package com.zach.blog.dto.response;

import com.zach.blog.model.SocialPlatform;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OwnerCardInfoResponse {
    private String avatar;
    private String username;
    private Long articleCount;
    private Long categoryCount;
    private Long tagCount;
    private List<SocialPlatform> socials;
}
