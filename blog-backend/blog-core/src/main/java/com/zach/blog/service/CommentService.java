package com.zach.blog.service;


import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.model.SessionUser;

import java.util.List;

public interface CommentService {
    PageResponse getComments(Integer pageNum, Integer pageSize, Long articleId);

    void createComment(SessionUser user, CommentRequest commentRequest);

    List<CommentQueryResult> getLinkComments(Integer pageNum, Integer pageSize);

    List<CommentQueryResult> getLatestComments();
}
