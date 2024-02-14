package com.zach.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AboutMeQueryResult {
    private String content;
    private String avatar;

    public AboutMeQueryResult(){

    }

    public AboutMeQueryResult(String content, String avatar) {
        this.content = content;
        this.avatar = avatar;
    }
}
