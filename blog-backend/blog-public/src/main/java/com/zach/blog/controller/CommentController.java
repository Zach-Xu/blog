package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.dto.response.ContactCommentResponse;
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
    @GetMapping("/article")
    public ResponseResult<?> getArticleComments(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam Long articleId) {
        PageResponse response = commentService.getArticleComments(pageNum, pageSize, articleId);
        return ResponseResult.ok(response);
    }

    @AccessLimit()
    @PreAuthorize("hasAuthority('content:comment:reply')")
    @Validate
    @Operation(summary = "Create Comment", description = "Create a new comment.")
    @PostMapping("/article")
    public ResponseResult<?> createArticleComment(@AuthenticationPrincipal SessionUser user, @Valid @RequestBody CommentRequest commentRequest, BindingResult bindingResult){
        commentService.createArticleComment(user, commentRequest);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 5)
    @Validate
    @Operation(summary = "Create contact Comment", description = "Create a contact comment.")
    @PostMapping("/contact")
    public ResponseResult<?> createContactComment(@AuthenticationPrincipal SessionUser user, @Valid @RequestBody CommentRequest commentRequest, BindingResult bindingResult){
        String tempUsername = commentService.createContactComment(user, commentRequest);
        return tempUsername == null ? ResponseResult.ok() : ResponseResult.ok(new ContactCommentResponse(tempUsername));
    }

    @AccessLimit()
    @Operation(summary = "Get Contact Comments", description = "Retrieve comments containing links with optional pagination.")
    @GetMapping("/contact")
    public ResponseResult<?> getContactComments(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize){
        PageResponse response = commentService.getContactComments(pageNum, pageSize);
        return ResponseResult.ok(response);
    }

    @AccessLimit()
    @Operation(summary = "Get Latest Comments", description = "Retrieve latest comments")
    @GetMapping("/latest")
    public ResponseResult<?> getLatestComments(@RequestParam(defaultValue = "5") Integer pageSize){
        List<CommentQueryResult> comments = commentService.getLatestComments();
        return ResponseResult.ok(comments);
    }
}
