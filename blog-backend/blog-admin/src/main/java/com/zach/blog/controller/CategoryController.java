package com.zach.blog.controller;

import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.response.*;
import com.zach.blog.dto.request.ChangeStatusRequest;
import com.zach.blog.dto.request.CreateCategoryRequest;
import com.zach.blog.dto.request.UpdateCategoryRequest;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Category;
import com.zach.blog.service.CategoryService;
import com.zach.blog.utils.BeanCopyUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseResult<?> getCategories(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                           @RequestParam(required = false) String name, @RequestParam(required = false) Boolean enable) {
        Page<Category> page = categoryService.getCategories(pageNum, pageSize, name, enable);
        List<CategoryManagementResponse> categories = BeanCopyUtils.copyBeanList(page.getContent(), CategoryManagementResponse.class);
        PageResponse response = new PageResponse(categories, page.getTotalPages(), categories.size());
        return ResponseResult.ok(response);
    }

    @GetMapping("/parent")
    public ResponseResult<?> getParentCategories(){
        List<Category> categories = categoryService.getParentCategories();
        List<ParentCategoryResponse> response = BeanCopyUtils.copyBeanList(categories, ParentCategoryResponse.class);
        return ResponseResult.ok(response);
    }

    @Validate
    @PostMapping
    public ResponseResult<?> createCategory(@AuthenticationPrincipal ApplicationUser user, @RequestBody @Valid CreateCategoryRequest request, BindingResult bindingResult) {
        Category category = categoryService.createCategory(request, user);
        CategoryManagementResponse response = BeanCopyUtils.copyBean(category, CategoryManagementResponse.class);
        return ResponseResult.ok(response);
    }

    @Validate
    @PutMapping("/{id}/status")
    public ResponseResult<?> updateCategoryStatus(@PathVariable Long id, @AuthenticationPrincipal ApplicationUser user, @RequestBody @Valid ChangeStatusRequest request, BindingResult bindingResult) {
        categoryService.changeCategoryStatus(id, request.enable(), user);
        return ResponseResult.ok();
    }

    @Validate
    @PutMapping("/{id}")
    public ResponseResult<?> updateCategory(@PathVariable Long id, @AuthenticationPrincipal ApplicationUser user, @RequestBody @Valid UpdateCategoryRequest request, BindingResult bindingResult) {
        categoryService.updateCategory(user.getId(), id, request);
        return ResponseResult.ok();
    }

    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseResult.ok();
    }
}
