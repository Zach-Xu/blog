package com.zach.blog.controller;

import com.zach.blog.dto.CommentQueryResult;
import com.zach.blog.dto.ResponseResult;
import com.zach.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseResult<?> getComments(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam Long articleId) {
        List<CommentQueryResult> comments = commentService.getComments(pageNum, pageSize, articleId);
        return ResponseResult.ok(comments);
    }
}
