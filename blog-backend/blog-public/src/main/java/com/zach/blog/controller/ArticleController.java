package com.zach.blog.controller;

import com.zach.blog.dto.response.*;
import com.zach.blog.model.Article;
import com.zach.blog.service.ArticleService;
import com.zach.blog.utils.BeanCopyUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Article", description = "Manage articles and their view counts")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @Operation(summary = "Get Article Detail", description = "Retrieve detailed information about an article by its ID.")
    @GetMapping("/{id}")
    public ResponseResult<?> getArticleDetail(@PathVariable("id") Long categoryId){
        Article article = articleService.getArticleDetail(categoryId);
        ArticleDetailResponse articleDetailResponse = BeanCopyUtils.copyBean(article, ArticleDetailResponse.class);
        return ResponseResult.ok(articleDetailResponse);
    }

    @Operation(summary = "Get Hot Articles", description = "Retrieve a list of hot articles.")
    @GetMapping("/hot")
    public ResponseResult<?> getHotArticles() {
        List<Article> hotArticles = articleService.getHotArticles();
        List<HotArticleResponse> hotArticlesResponse = BeanCopyUtils.copyBeanList(hotArticles, HotArticleResponse.class);
        return ResponseResult.ok(hotArticlesResponse);
    }

    @Operation(summary = "Get Articles", description = "Retrieve a list of articles with optional pagination and category filter.")
    @GetMapping
    public ResponseResult<?> getArticles(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam(required = false) Long categoryId) {
        Page<Article> articlePage = articleService.getArticles(pageNum, pageSize, categoryId);
        List<ArticleResponse> articlesResponse = BeanCopyUtils.copyBeanListWithAssociationPropertyAsField(articlePage.getContent(), ArticleResponse.class);
        return ResponseResult.ok(new PageResponse(articlesResponse, articlePage.getTotalPages(), articlesResponse.size()));
    }

    @Operation(summary = "Update Article View Count", description = "Increment the view count of a specific article by its ID.")
    @PutMapping("/view-count/{id}")
    public ResponseResult<?> updateArticleViewCount(@PathVariable("id") Long articleId){
        articleService.updateViewCount(articleId);
        return ResponseResult.ok();
    }

}
