package com.zach.blog.controller;

import com.zach.blog.dto.CategoryResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.Category;
import com.zach.blog.service.CategoryService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/all")
    public ResponseResult<?> getAllCategories() {
        List<Category> allCategories = categoryService.getAllCategories();
        List<CategoryResponse> categories = BeanCopyUtils.copyBeanList(allCategories, CategoryResponse.class);
        return ResponseResult.ok(categories);
    }
}
