package com.zach.blog.service.impl;

import com.zach.blog.dto.request.CreateCategoryRequest;
import com.zach.blog.dto.request.UpdateCategoryRequest;
import com.zach.blog.exception.ResourceAlreadyExistException;
import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.ApplicationUser;
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

import static com.zach.blog.enums.code.ResourceAlreadyExistCode.CATEGORY_NAME_EXIST;
import static com.zach.blog.enums.code.ResourceNotFoundCode.CATEGORY_NOT_FOUND;
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
        return categoryRepository.findAll(isEnable(true), Sort.by("name").ascending());
    }

    @Override
    public Page<Category> getCategories(Integer pageNum, Integer pageSize, String name, Boolean enable) {
        Sort sort = Sort.by("name");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
        Specification<Category> specs = Specification.where(null);
        if (Strings.hasText(name)) {
            specs = specs.and(containsName(name));
        }
        if (Objects.nonNull(enable)) {
            specs = specs.and(isEnable(enable));
        }
        return categoryRepository.findAll(specs, pageRequest);
    }

    @Override
    public Category createCategory(CreateCategoryRequest request, ApplicationUser user) {
        Category category = new Category();
        if(categoryRepository.existsByName(request.name())){
            throw new ResourceAlreadyExistException(CATEGORY_NAME_EXIST);
        }
        category.setName(request.name());
        category.setDescription(request.description());
        category.setPid(request.parentId());
        category.setEnable(request.enable());
        category.setCreatedBy(user.getId());
        return categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Long userId, Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND));
        category.setUpdateBy(userId);
        category.setName(request.name());
        category.setDescription(request.description());
        category.setEnable(request.enable());
        category.setPid(request.parentId());
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND));
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    @Override
    public void changeCategoryStatus(Long id, Boolean enable, ApplicationUser user) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND));
        category.setEnable(enable);
        category.setUpdateBy(user.getId());
        categoryRepository.save(category);
    }

    @Override
    public List<Category> getParentCategories() {
        // By default, parent categories have pid set to -1
        return categoryRepository.findAllByPid(-1L);
    }
}
