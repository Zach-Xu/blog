package com.zach.blog.service;

import com.zach.blog.dto.request.CreateCategoryRequest;
import com.zach.blog.dto.request.UpdateCategoryRequest;
import com.zach.blog.model.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories();

    List<Category> getAllCategories();

    Page<Category> getCategories(Integer pageNum, Integer pageSize, String name, Boolean enable);

    void createCategory(CreateCategoryRequest request);

    void updateCategory(Long userId, Long id, UpdateCategoryRequest request);

    void deleteCategory(Long id);
}
