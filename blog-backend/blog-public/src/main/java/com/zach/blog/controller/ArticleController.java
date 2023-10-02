package com.zach.blog.controller;

import com.zach.blog.dto.*;
import com.zach.blog.model.Article;
import com.zach.blog.service.ArticleService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseResult<?> getArticleDetail(@PathVariable("id") Long categoryId){
        Article article = articleService.getArticleDetail(categoryId);
        ArticleDetailResponse articleDetailResponse = BeanCopyUtils.copyBean(article, ArticleDetailResponse.class);
        return ResponseResult.ok(articleDetailResponse);
    }

    @GetMapping("/hot")
    public ResponseResult<?> getHotArticles() {
        List<Article> hotArticles = articleService.getHotArticles();
        List<HotArticleResponse> hotArticlesResponse = BeanCopyUtils.copyBeanList(hotArticles, HotArticleResponse.class);
        return ResponseResult.ok(hotArticlesResponse);
    }

    @GetMapping
    public ResponseResult<?> getArticles(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam(required = false) Long categoryId) {
        Page<Article> articlePage = articleService.getArticles(pageNum, pageSize, categoryId);
        List<ArticleResponse> articlesResponse = BeanCopyUtils.copyBeanListWithAssociationPropertyAsField(articlePage.getContent(), ArticleResponse.class);
        return ResponseResult.ok(new PageResponse(articlesResponse, articlePage.getTotalPages(), articlesResponse.size()));
    }

}
