package com.zach.blog.service.impl;


import com.github.javafaker.Faker;
import com.zach.blog.dto.request.CommentRequest;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.enums.CommentType;
import com.zach.blog.exception.*;
import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.model.Comment;
import com.zach.blog.model.SessionUser;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.repository.CommentRepository;
import com.zach.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;
import java.util.Random;

import static com.zach.blog.enums.code.ResourceNotFoundCode.*;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final ApplicationUserRepository userRepository;

    @Override
    public PageResponse getArticleComments(Integer pageNum, Integer pageSize, Long articleId) {
        PageRequest rootPageRequest = PageRequest.of(pageNum, pageSize);
        Page<CommentQueryResult> page = commentRepository.findRootArticleComments(articleId, rootPageRequest);
        List<CommentQueryResult> rootComments = page.getContent();
        int totalPages = page.getTotalPages();
        return new PageResponse(getSubArticleComments(rootComments), totalPages, page.getTotalElements());
    }

    public void createArticleComment(SessionUser user, CommentRequest commentRequest) {
        validateArticleComment(commentRequest);

        Comment comment = new Comment();
        comment.setType(CommentType.ARTICLE);
        comment.setContent(commentRequest.content());
        comment.setUser(userRepository.getReferenceById(user.getId()));
        comment.setTempUsername(user.getUsername());
        comment.setArticle(articleRepository.getReferenceById(commentRequest.articleId()));
        // Set ToComment association only when this is a sub comment
        if (commentRequest.rootCommentId() != -1L) {
            comment.setToComment(commentRepository.getReferenceById(commentRequest.toCommentId()));
        }

        comment.setRootCommentId(commentRequest.rootCommentId());
        commentRepository.save(comment);
    }

    public String createContactComment(SessionUser user, CommentRequest commentRequest) {
        validateComment(commentRequest);

        Comment comment = new Comment();
        comment.setType(CommentType.CONTACT);
        comment.setContent(commentRequest.content());

        String tempUsername = null;
        if (Objects.nonNull(user)) {
            comment.setUser(userRepository.getReferenceById(user.getId()));
            comment.setTempUsername(user.getUsername());
        } else if (Objects.nonNull(commentRequest.tempUsername()) && commentRepository.existsByTempUsername(commentRequest.tempUsername())) {
            comment.setTempUsername(commentRequest.tempUsername());
        } else {
            Faker faker = new Faker(new Random(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC)));
            tempUsername = faker.name().name();
            comment.setTempUsername(tempUsername);
        }

        // Set ToComment association only when this is a sub comment
        if (commentRequest.rootCommentId() != -1L) {
            comment.setToComment(commentRepository.getReferenceById(commentRequest.toCommentId()));
        }
        comment.setRootCommentId(commentRequest.rootCommentId());
        commentRepository.save(comment);
        return tempUsername;
    }

    private void validateArticleComment(CommentRequest commentRequest) {
        if (Objects.isNull(commentRequest.articleId())) {
            throw new MissingParameterException("The ID of the article being replied to was not specified");
        }

        // ToDo: validate if article is allowed to comment
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
    }

    @Override
    public PageResponse getContactComments(Integer pageNum, Integer pageSize) {
        PageRequest rootPageRequest = PageRequest.of(pageNum, pageSize);
        Page<CommentQueryResult> page = commentRepository.findRootContactComments(rootPageRequest);
        List<CommentQueryResult> rootContactComments = page.getContent();
        int totalPages = page.getTotalPages();
        return new PageResponse(getSubContactComments(rootContactComments), totalPages, page.getTotalElements());

    }

    @Override
    public List<CommentQueryResult> getLatestComments() {
        PageRequest pageRequest = PageRequest.of(0, 5);
        Page<CommentQueryResult> page = commentRepository.findLatestComments(pageRequest);
        return page.getContent();
    }

    private List<CommentQueryResult> getSubArticleComments(List<CommentQueryResult> rootComments) {
        PageRequest subPageRequest = PageRequest.of(0, 5);

        rootComments.forEach(rootComment -> {
            List<CommentQueryResult> subComments = commentRepository.findSubArticleComments(rootComment.getCommentId(), subPageRequest).getContent();
            rootComment.setSubComments(subComments);
        });
        return rootComments;
    }

    private List<CommentQueryResult> getSubContactComments(List<CommentQueryResult> rootComments) {
        PageRequest subPageRequest = PageRequest.of(0, 5);

        rootComments.forEach(rootComment -> {
            List<CommentQueryResult> subComments = commentRepository.findSubContactComments(rootComment.getCommentId(), subPageRequest).getContent();
            rootComment.setSubComments(subComments);
        });
        return rootComments;
    }
}
