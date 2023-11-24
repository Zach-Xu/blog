package com.zach.blog.controller;

import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.response.ArticleResponse;
import com.zach.blog.dto.request.UpdateArticleRequest;
import com.zach.blog.dto.request.WriteArticleRequest;
import com.zach.blog.dto.response.ArticleDetailResponse;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Article;
import com.zach.blog.service.ArticleService;
import com.zach.blog.utils.BeanCopyUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    private final ArticleService articleService;

    @Validate
    @PostMapping
    public ResponseResult<?> writeArticle(@AuthenticationPrincipal ApplicationUser user,
                                          @Valid WriteArticleRequest writeArticleRequest, BindingResult bindingResult) throws IOException {
        articleService.createArticle(user, writeArticleRequest);
        return ResponseResult.ok();
    }

    @GetMapping
    public ResponseResult<?> getArticles(@RequestParam(defaultValue = "0") Integer pageNum,
                                         @RequestParam(defaultValue = "5") Integer pageSize,
                                         @RequestParam(required = false) String title, @RequestParam(required = false) String summary) {
        Page<Article> page = articleService.getArticles(pageNum, pageSize, title, summary);
        List<Article> articles = page.getContent();
        List<ArticleResponse> articleResponses = BeanCopyUtils.copyBeanList(articles, ArticleResponse.class);
        int totalPages = page.getTotalPages();
        PageResponse pageResponse = new PageResponse(articleResponses, totalPages, articleResponses.size());
        return ResponseResult.ok(pageResponse);
    }

    @GetMapping("/{id}")
    public ResponseResult<?> getArticleDetails(@PathVariable Long id) {
        Article article = articleService.getArticleDetail(id);
        ArticleDetailResponse articleDetailResponse = BeanCopyUtils.copyBean(article, ArticleDetailResponse.class);
        return ResponseResult.ok(articleDetailResponse);
    }

    @Validate
    @PutMapping("/{id}")
    public ResponseResult<?> updateArticle(@PathVariable Long id,
                                           @Valid UpdateArticleRequest updateArticleRequest, BindingResult bindingResult) throws IOException {
        Article article = articleService.updateArticle(id, updateArticleRequest);
        ArticleResponse response = BeanCopyUtils.copyBean(article, ArticleResponse.class);
        return ResponseResult.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseResult.ok();
    }

}
