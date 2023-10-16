package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PageResponse {

    private List rows;

    private int totalPages;

    private int total;

    public PageResponse(){

    }

    public PageResponse(List rows, int totalPages, int total) {
        this.rows = rows;
        this.totalPages = totalPages;
        this.total = total;
    }
}
