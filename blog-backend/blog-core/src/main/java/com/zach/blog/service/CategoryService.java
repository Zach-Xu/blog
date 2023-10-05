package com.zach.blog.service;

import com.zach.blog.model.Category;

import java.util.List;

public interface CategoryService {

    void createCategories(List<Category> categoryList);

    Category findByCategoryName(String categoryName);

    List<Category> getCategories();
}