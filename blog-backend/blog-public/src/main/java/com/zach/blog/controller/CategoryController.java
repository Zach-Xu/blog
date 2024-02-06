package com.zach.blog.controller;

import com.zach.blog.dto.response.CategoryStatsResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.Category;
import com.zach.blog.service.CategoryService;
import com.zach.blog.utils.BeanCopyUtils;
import com.zach.blog.dto.response.CategoryResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Category", description = "Manage categories for articles")
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Get Categories", description = "Retrieve a list of article categories.")
    @GetMapping
    public ResponseResult<?> getCategories(){
        List<Category> categories = categoryService.getCategories();
        List<CategoryResponse> categoriesResponse = BeanCopyUtils.copyBeanList(categories, CategoryResponse.class);
        return ResponseResult.ok(categoriesResponse);
    }

    @Operation(summary = "Get category stats", description = "Retrieve a list of categories and their corresponding number of articles ")
    @GetMapping("/stats")
    public ResponseResult<?> getCategoryStats(){
        List<CategoryStatsResponse> response = categoryService.getCategoryStats();
        return ResponseResult.ok(response);
    }


}
