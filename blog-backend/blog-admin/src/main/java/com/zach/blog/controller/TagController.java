package com.zach.blog.controller;

import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.Tag;
import com.zach.blog.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseResult<?> getTags(){
        List<Tag> tags = tagService.getTags();
        return ResponseResult.ok(tags);
    }
}
