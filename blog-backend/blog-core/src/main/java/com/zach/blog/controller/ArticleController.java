package com.zach.blog.controller;

import com.zach.blog.dto.HotArticleResponse;
import com.zach.blog.dto.ResponseResult;
import com.zach.blog.model.Article;
import com.zach.blog.service.ArticleService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticles(){
        return articleService.getAllArticles();
    }

    @GetMapping("/hot")
    public ResponseResult<?> getHotArticles(){
        List<Article> hotArticles = articleService.getHotArticles();
        List<HotArticleResponse> hotArticlesResponse = BeanCopyUtils.copyBeanList(hotArticles, HotArticleResponse.class);
        return ResponseResult.ok(hotArticlesResponse);
    }



}
