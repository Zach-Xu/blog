package com.zach.blog.service;

import com.zach.blog.dto.request.UpdateArticleRequest;
import com.zach.blog.dto.request.WriteArticleRequest;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Article;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ArticleService {
    List<Article> getHotArticles();

    Page<Article> getArticles(Integer pageNum, Integer pageSize, Long categoryId);

    Article getArticleDetail(Long categoryId);

    void updateViewCount(Long articleId);

    void createArticle(ApplicationUser user, WriteArticleRequest writeArticleRequest);

    Page<Article> getArticles(Integer pageNum, Integer pageSize, String title, String summary);

    void updateArticle(Long id, UpdateArticleRequest updateArticleRequest);

    void deleteArticle(Long id);
}
