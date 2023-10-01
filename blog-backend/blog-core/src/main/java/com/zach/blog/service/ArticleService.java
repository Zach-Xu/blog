package com.zach.blog.service;

import com.zach.blog.model.Article;

import java.util.List;

public interface ArticleService {

    List<Article> getAllArticles();

    void createArticles(List<Article> articles);

    List<Article> getHotArticles();
}
