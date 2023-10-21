package com.zach.blog.service.impl;

import com.zach.blog.dto.request.CreateCategoryRequest;
import com.zach.blog.dto.request.UpdateCategoryRequest;
import com.zach.blog.exception.SystemException;
import com.zach.blog.service.CategoryService;
import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Category;
import com.zach.blog.repository.CategoryRepository;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static com.zach.blog.repository.CategoryRepository.Specs.containsName;
import static com.zach.blog.repository.CategoryRepository.Specs.isEnable;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories() {
        // Fetch categories with at least one published article
        return categoryRepository.findCategoriesWithPublishedArticles(PublishStatus.PUBLISHED);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll(Sort.by("name").ascending());
    }

    @Override
    public Page<Category> getCategories(Integer pageNum, Integer pageSize, String name, Boolean enable) {
        Sort sort = Sort.by("name");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
        Specification<Category> specs = Specification.where(null);
        if(Strings.hasText(name)){
            specs = specs.and(containsName(name));
        }
        if(Objects.nonNull(enable)){
            specs = specs.and(isEnable(enable));
        }
        return categoryRepository.findAll(specs, pageRequest);
    }

    @Override
    public void createCategory(CreateCategoryRequest request) {
        Category category = new Category();
        category.setName(request.name());
        category.setDescription(request.description());
        category.setPid(request.parentId());
        category.setEnable(request.enable());
        categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Long userId, Long id, UpdateCategoryRequest request) {
        // ToDo: refactor exception handling
        Category category = categoryRepository.findById(id).orElseThrow(SystemException::new);
        category.setUpdateBy(userId);
        category.setName(request.name());
        category.setDescription(request.description());
        category.setEnable(request.enable());
        category.setPid(request.parentId());
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        // ToDo: refactor exception handling
        Category category = categoryRepository.findById(id).orElseThrow(SystemException::new);
        category.setDeleted(true);
        categoryRepository.save(category);
    }
}
