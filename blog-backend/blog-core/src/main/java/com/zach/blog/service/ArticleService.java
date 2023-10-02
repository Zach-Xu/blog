package com.zach.blog.service;

import com.zach.blog.model.Article;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ArticleService {

    List<Article> getAllArticles();

    void createArticles(List<Article> articles);

    List<Article> getHotArticles();

    Page<Article> getArticles(Integer pageNum, Integer pageSize, Long categoryId);

    Article getArticleDetail(Long categoryId);
}
