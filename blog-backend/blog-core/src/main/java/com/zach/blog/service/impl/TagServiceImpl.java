package com.zach.blog.service.impl;

import com.zach.blog.exception.ResourceAlreadyExistException;
import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Tag;
import com.zach.blog.repository.TagRepository;
import com.zach.blog.service.TagService;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.zach.blog.enums.code.ResourceAlreadyExistCode.TAG_NAME_EXIST;
import static com.zach.blog.enums.code.ResourceNotFoundCode.TAG_NOT_FOUND;
import static com.zach.blog.repository.TagRepository.Specs.containsDescription;
import static com.zach.blog.repository.TagRepository.Specs.containsTagName;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Override
    public Page<Tag> getTags(Integer pageNum, Integer pageSize, String tagName, String description) {
        PageRequest pageRequest = PageRequest.of(pageNum,pageSize, Sort.by("id").ascending());

        Specification<Tag> spec = Specification.where(null);
        if(Strings.hasText(tagName)){
            spec = spec.and(containsTagName(tagName));
        }
        if(Strings.hasText(description)){
            spec = spec.and(containsDescription(description));
        }
        return tagRepository.findAll(spec, pageRequest);
    }

    @Override
    public Tag createTag(Long userId, String name, String description) {
        if( tagRepository.existsByNameIgnoreCase(name)){
            throw new ResourceAlreadyExistException(TAG_NAME_EXIST);
        }

        Tag tag = new Tag();
        tag.setName(name);
        tag.setDescription(description);
        tag.setCreatedBy(userId);
        return tagRepository.save(tag);
    }

    @Override
    public void deleteTag(Long userId, Long tagId) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new ResourceNotFoundException(TAG_NOT_FOUND));
        tag.setDeleted(true);
        tag.setUpdateBy(userId);
        tagRepository.save(tag);
    }

    @Override
    public void updateTag(Long userId, Long tagId, String name, String description) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new ResourceNotFoundException(TAG_NOT_FOUND));
        if(tagRepository.existsByNameIgnoreCase(name)){
            throw new ResourceAlreadyExistException(TAG_NAME_EXIST);
        }
        tag.setName(name);
        tag.setDescription(description);
        tag.setUpdateBy(userId);
        tagRepository.save(tag);
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll(Sort.by("name").ascending());
    }
}
