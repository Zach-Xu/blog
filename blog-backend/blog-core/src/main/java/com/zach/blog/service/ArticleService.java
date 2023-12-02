package com.zach.blog.service;

import com.zach.blog.dto.request.UpdateArticleRequest;
import com.zach.blog.dto.request.WriteArticleRequest;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ArticleService {
    List<Article> getHotArticles();

    Page<Article> getArticles(Integer pageNum, Integer pageSize, Long categoryId);

    Article getArticleDetail(Long categoryId);

    void updateViewCount(Long articleId);

    void createArticle(Long userId, WriteArticleRequest writeArticleRequest) throws IOException;

    Page<Article> getArticles(Integer pageNum, Integer pageSize, String title, String summary);

    Article updateArticle(Long id, UpdateArticleRequest updateArticleRequest) throws IOException;

    void deleteArticle(Long id);

    void updateArticleImage(Long articleId, ApplicationUser user, MultipartFile image) throws IOException;
}
