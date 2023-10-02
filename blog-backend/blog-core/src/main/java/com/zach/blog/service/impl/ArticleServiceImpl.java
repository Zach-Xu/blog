package com.zach.blog.service.impl;

import com.zach.blog.enums.PublishStatus;
import com.zach.blog.exception.ArticleNotExistException;
import com.zach.blog.model.Article;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static com.zach.blog.repository.ArticleRepository.Specs.byCategoryId;
import static com.zach.blog.repository.ArticleRepository.Specs.byPublishStatus;
import static org.springframework.data.jpa.domain.Specification.where;

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
        return articleRepository.findHotArticles(PublishStatus.PUBLISHED, pageRequest);
    }

    @Override
    public Page<Article> getArticles(Integer pageNum, Integer pageSize, Long categoryId) {
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, Sort.by("pinned").descending());
        Page<Article> articlePage;

        Specification<Article> commonSpec = byPublishStatus(PublishStatus.PUBLISHED);

        if (Objects.isNull(categoryId)) {
            articlePage = articleRepository.findAll(commonSpec, pageRequest);
        } else {
            articlePage = articleRepository.findAll(where(byCategoryId(categoryId)).and(commonSpec), pageRequest);
        }

        return articlePage;
    }

    @Override
    public Article getArticleDetail(Long categoryId) {
        return articleRepository.findById(categoryId).orElseThrow(ArticleNotExistException::new);
    }
}
