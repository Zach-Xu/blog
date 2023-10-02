package com.zach.blog.controller;

import com.zach.blog.dto.ResponseResult;
import com.zach.blog.model.Category;
import com.zach.blog.service.CategoryService;
import com.zach.blog.utils.BeanCopyUtils;
import com.zach.blog.dto.CategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseResult<?> getCategories(){
        List<Category> categories = categoryService.getCategories();
        List<CategoryResponse> categoriesResponse = BeanCopyUtils.copyBeanList(categories, CategoryResponse.class);
        return ResponseResult.ok(categoriesResponse);
    }
}
