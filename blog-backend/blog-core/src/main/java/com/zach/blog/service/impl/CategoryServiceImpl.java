package com.zach.blog.service.impl;

import com.zach.blog.exception.CategoryNotExistException;
import com.zach.blog.service.CategoryService;
import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Category;
import com.zach.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findCategoriesWithPublishedArticles(PublishStatus.PUBLISHED);
    }
}
