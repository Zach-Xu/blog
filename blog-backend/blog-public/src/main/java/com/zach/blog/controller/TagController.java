package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.dto.response.CategoryStatsResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.TagStatsResponse;
import com.zach.blog.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Tag", description = "Manage tags for articles")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    @AccessLimit()
    @Operation(summary = "Get category stats", description = "Retrieve a list of tags and their corresponding number of articles ")
    @GetMapping("/stats")
    public ResponseResult<?> getTagStats(){
        List<TagStatsResponse> response = tagService.getTagStats();
        return ResponseResult.ok(response);
    }
}
