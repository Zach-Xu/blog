package com.zach.blog.service.impl;


import com.zach.blog.dto.CommentQueryResult;
import com.zach.blog.repository.CommentRepository;
import com.zach.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public List<CommentQueryResult> getComments(Integer pageNum, Integer pageSize, Long articleId) {
        PageRequest rootPageRequest = PageRequest.of(pageNum, pageSize);
        Page<CommentQueryResult> rootCommentsPage = commentRepository.findRootCommentsByArticleId(articleId, rootPageRequest);
        List<CommentQueryResult> rootComments = rootCommentsPage.getContent();

        // ToDo: pagination for sub comments
        PageRequest subPageRequest = PageRequest.of(0, 5);

        // For each root comment, retrieve its sub comments
        for (CommentQueryResult rootComment : rootComments) {
            List<CommentQueryResult> subComments = commentRepository.findSubCommentsByRootCommentId(rootComment.getCommentId(), subPageRequest).getContent();
            rootComment.setSubComments(subComments);
        }
        return rootComments;
    }
}
