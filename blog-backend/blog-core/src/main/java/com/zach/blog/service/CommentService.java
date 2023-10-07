package com.zach.blog.service;


import com.zach.blog.dto.CommentQueryResult;

import java.util.List;

public interface CommentService {
    List<CommentQueryResult> getComments(Integer pageNum, Integer pageSize, Long articleId);
}
