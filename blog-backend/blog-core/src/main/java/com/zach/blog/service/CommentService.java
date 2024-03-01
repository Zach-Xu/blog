package com.zach.blog.service;


import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.model.SessionUser;

import java.util.List;

public interface CommentService {
    PageResponse getArticleComments(Integer pageNum, Integer pageSize, Long articleId);

    PageResponse getContactComments(Integer pageNum, Integer pageSize);

    List<CommentQueryResult> getLatestComments();

    String createContactComment(SessionUser user, CommentRequest commentRequest);

    void createArticleComment(SessionUser user, CommentRequest commentRequest);
}
