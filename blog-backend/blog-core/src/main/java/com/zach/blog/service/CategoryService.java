package com.zach.blog.service;

import com.zach.blog.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories();

    List<Category> getAllCategories();
}
