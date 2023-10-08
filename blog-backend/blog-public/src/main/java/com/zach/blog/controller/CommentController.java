package com.zach.blog.controller;

import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseResult<?> createComment(@AuthenticationPrincipal ApplicationUser user, @RequestBody CommentRequest commentRequest){
        commentService.createComment(user, commentRequest);
        return ResponseResult.ok();
    }

    @GetMapping("/link")
    public ResponseResult<?> getLinkComments(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize){
        List<CommentQueryResult> comments = commentService.getLinkComments(pageNum,pageSize);
        return ResponseResult.ok(comments);
    }
}
