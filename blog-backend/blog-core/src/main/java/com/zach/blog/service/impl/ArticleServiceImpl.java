package com.zach.blog.service.impl;

import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Article;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public void createArticles(List<Article> articles) {
        articleRepository.saveAll(articles);
    }

    @Override
    public List<Article> getHotArticles() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        return articleRepository.findHotArticles(pageRequest);
    }
}
