package com.zach.blog.service.impl;


import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.enums.CommentType;
import com.zach.blog.enums.code.ResourceNotFoundCode;
import com.zach.blog.exception.*;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Comment;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.repository.CommentRepository;
import com.zach.blog.service.CommentService;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.zach.blog.enums.code.ResourceNotFoundCode.*;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;

    @Override
    public List<CommentQueryResult> getComments(Integer pageNum, Integer pageSize, Long articleId) {
        PageRequest rootPageRequest = PageRequest.of(pageNum, pageSize);
        List<CommentQueryResult> rootComments = commentRepository.findRootCommentsByArticleId(articleId, rootPageRequest).getContent();
        return getSubComments(rootComments);
    }

    @Override
    public void createComment(ApplicationUser user, CommentRequest commentRequest) {

        if (commentRequest.type() == CommentType.ARTICLE) {
            createArticleComment(user, commentRequest);
        } else {
            createLinkComment(user, commentRequest);
        }
    }

    private void createArticleComment(ApplicationUser user, CommentRequest commentRequest) {
        validateArticleComment(commentRequest);

        Comment comment = new Comment();
        comment.setType(commentRequest.type());
        comment.setContent(commentRequest.content());
        comment.setUser(user);
        comment.setArticle(articleRepository.getReferenceById(commentRequest.articleId()));
        // Set ToComment association only when this is a sub comment
        if (commentRequest.rootCommentId() != -1L) {
            comment.setToComment(commentRepository.getReferenceById(commentRequest.toCommentId()));
        }

        comment.setRootCommentId(commentRequest.rootCommentId());
        commentRepository.save(comment);
    }

    private void createLinkComment(ApplicationUser user, CommentRequest commentRequest) {
        validateComment(commentRequest);

        Comment comment = new Comment();
        comment.setType(commentRequest.type());
        comment.setContent(commentRequest.content());
        comment.setUser(user);
        // Set ToComment association only when this is a sub comment
        if (commentRequest.rootCommentId() != -1L) {
            comment.setToComment(commentRepository.getReferenceById(commentRequest.toCommentId()));
        }
        comment.setRootCommentId(commentRequest.rootCommentId());
        commentRepository.save(comment);
    }

    private void validateArticleComment(CommentRequest commentRequest) {
        if (Objects.isNull(commentRequest.articleId())) {
            throw new MissingParameterException("The ID of the article being replied to was not specified");
        }

        if (!articleRepository.existsById(commentRequest.articleId())) {
            throw new ResourceNotFoundException(ARTICLE_NOT_FOUND);
        }
        validateComment(commentRequest);
    }

    private void validateComment(CommentRequest commentRequest) {
        if (commentRequest.rootCommentId() != -1L) {
            if (Objects.isNull(commentRequest.toCommentId())) {
                throw new MissingParameterException("The ID of the comment being replied to was not specified");
            }

            if (!commentRepository.existsById(commentRequest.rootCommentId())) {
                throw new ResourceNotFoundException(ROOT_COMMENT_NOT_FOUND);
            }
            if (!commentRepository.existsById(commentRequest.toCommentId())) {
                throw new ResourceNotFoundException(TO_COMMENT_NOT_FOUND);
            }
        }
        if (!Strings.hasText(commentRequest.content())) {
            throw new MissingParameterException("Content is missing!");
        }
    }

    @Override
    public List<CommentQueryResult> getLinkComments(Integer pageNum, Integer pageSize) {
        PageRequest rootPageRequest = PageRequest.of(pageNum, pageSize);
        List<CommentQueryResult> rootLinkComments = commentRepository.findRootLinkComments(rootPageRequest).getContent();
        return getSubComments(rootLinkComments);
    }

    private List<CommentQueryResult> getSubComments(List<CommentQueryResult> rootComments) {
        PageRequest subPageRequest = PageRequest.of(0, 5);

        rootComments.forEach(rootComment -> {
            List<CommentQueryResult> subComments = commentRepository.findSubCommentsByRootCommentId(rootComment.getCommentId(), subPageRequest).getContent();
            rootComment.setSubComments(subComments);
        });
        return rootComments;
    }
}
