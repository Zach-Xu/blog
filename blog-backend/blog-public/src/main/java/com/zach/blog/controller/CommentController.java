package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Comment;
import com.zach.blog.model.SessionUser;
import com.zach.blog.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Comment", description = "Manage comments on articles")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @AccessLimit()
    @Operation(summary = "Get Comments", description = "Retrieve comments with optional pagination and filtering by article.")
    @GetMapping
    public ResponseResult<?> getComments(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam Long articleId) {
        PageResponse response = commentService.getComments(pageNum, pageSize, articleId);
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 10)
    @PreAuthorize("hasAuthority('content:comment:reply')")
    @Validate
    @Operation(summary = "Create Comment", description = "Create a new comment.")
    @PostMapping
    public ResponseResult<?> createComment(@AuthenticationPrincipal SessionUser user, @Valid @RequestBody CommentRequest commentRequest, BindingResult bindingResult){
        commentService.createComment(user, commentRequest);
        return ResponseResult.ok();
    }

    @AccessLimit()
    @Operation(summary = "Get Link Comments", description = "Retrieve comments containing links with optional pagination.")
    @GetMapping("/link")
    public ResponseResult<?> getLinkComments(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize){
        List<CommentQueryResult> comments = commentService.getLinkComments(pageNum,pageSize);
        return ResponseResult.ok(comments);
    }

    @AccessLimit()
    @Operation(summary = "Get Latest Comments", description = "Retrieve latest comments")
    @GetMapping("/latest")
    public ResponseResult<?> getLatestComments(@RequestParam(defaultValue = "5") Integer pageSize){
        List<CommentQueryResult> comments = commentService.getLatestComments();
        return ResponseResult.ok(comments);
    }
}
