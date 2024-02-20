package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.dto.response.*;
import com.zach.blog.model.Article;
import com.zach.blog.service.ArticleService;
import com.zach.blog.utils.BeanCopyUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Article", description = "Manage articles and their view counts")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;


    @AccessLimit(maxCount = 20)
    @Operation(summary = "Get Article Detail", description = "Retrieve detailed information about an article by its ID.")
    @GetMapping("/{id}")
    public ResponseResult<?> getArticleDetails(@PathVariable("id") Long id) {
        return ResponseResult.ok( articleService.getArticleDetail(id));
    }

    @AccessLimit()
    @Operation(summary = "Get Featured Articles", description = "Retrieve a list of featured articles.")
    @GetMapping("/featured")
    public ResponseResult<?> getFeaturedArticles() {
        List<Article> featuredArticles = articleService.getFeaturedArticles();

        List<FeaturedArticleResponse> response = featuredArticles.stream().
                map(article -> {
                    FeaturedArticleResponse featuredArticle = BeanCopyUtils.copyBean(article, FeaturedArticleResponse.class);
                    featuredArticle.setCategory(BeanCopyUtils.copyBean(article.getCategory(), CategoryResponse.class));
                    featuredArticle.setTags(BeanCopyUtils.copyBeanList(article.getTags().stream().toList(), TagResponse.class));
                    return featuredArticle;
                }).collect(Collectors.toList());

        return ResponseResult.ok(response);
    }

    @AccessLimit()
    @Operation(summary = "Get Articles", description = "Retrieve a list of articles with optional pagination and category filter.")
    @GetMapping
    public ResponseResult<?> getArticles(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam(required = false) Long categoryId, @RequestParam(required = false) Long tagId) {
        Page<Article> page = articleService.getArticles(pageNum, pageSize, categoryId, tagId);
        int totalPages = page.getTotalPages();

        List<Article> articles = page.getContent();
        List<ArticleResponse> response = articles.stream().map(article -> {
            ArticleResponse articleResp = BeanCopyUtils.copyBean(article, ArticleResponse.class);
            articleResp.setCategory(BeanCopyUtils.copyBean(article.getCategory(), CategoryResponse.class));
            articleResp.setTags(BeanCopyUtils.copyBeanList(article.getTags().stream().toList(), TagResponse.class));
            return articleResp;
        }).collect(Collectors.toList());

        PageResponse pageResponse = new PageResponse(response, totalPages, page.getTotalElements());
        return ResponseResult.ok(pageResponse);
    }

    @Operation(summary = "Update Article View Count", description = "Increment the view count of a specific article by its ID.")
    @PutMapping("/view-count/{id}")
    public ResponseResult<?> updateArticleViewCount(@PathVariable("id") Long articleId) {
        articleService.updateViewCount(articleId);
        return ResponseResult.ok();
    }
}
