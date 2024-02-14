package com.zach.blog.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PageResponse {

    private List rows;

    private int totalPages;

    /** total number of records in DB */
    private long total;

    public PageResponse(){

    }

    public PageResponse(List rows, int totalPages, long total) {
        this.rows = rows;
        this.totalPages = totalPages;
        this.total = total;
    }
}
