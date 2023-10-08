package com.zach.blog.service;


import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.model.ApplicationUser;

import java.util.List;

public interface CommentService {
    List<CommentQueryResult> getComments(Integer pageNum, Integer pageSize, Long articleId);

    void createComment(ApplicationUser user, CommentRequest commentRequest);

    List<CommentQueryResult> getLinkComments(Integer pageNum, Integer pageSize);
}
