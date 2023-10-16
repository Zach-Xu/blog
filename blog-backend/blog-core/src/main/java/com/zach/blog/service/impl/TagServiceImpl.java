package com.zach.blog.service.impl;

import com.zach.blog.exception.SystemException;
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

import static com.zach.blog.repository.TagRepository.Specs.containsDescription;
import static com.zach.blog.repository.TagRepository.Specs.containsTagName;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Override
    public Page<Tag> getTags(Integer pageNum, Integer pageSize, String tagName, String description) {
        PageRequest pageRequest = PageRequest.of(pageNum,pageSize, Sort.by("name").ascending());

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
    public void createTag(ApplicationUser user, String name, String description) {
        Tag tag = new Tag();
        // ToDo: DTO Validation
        tag.setName(name);
        tag.setDescription(description);
        tag.setCreatedBy(user.getId());
        tagRepository.save(tag);
    }

    @Override
    public void deleteTag(ApplicationUser user, Long tagId) {
        // ToDo: refactor exception handling
        Tag tag = tagRepository.findById(tagId).orElseThrow(SystemException::new);
        tag.setDeleted(true);
        tag.setUpdateBy(user.getId());
        tagRepository.save(tag);
    }

    @Override
    public void updateTag(ApplicationUser user, Long tagId, String name, String description) {
        // ToDo: refactor exception handling
        Tag tag = tagRepository.findById(tagId).orElseThrow(SystemException::new);
        tag.setName(name);
        tag.setDescription(description);
        tag.setUpdateBy(user.getId());
        tagRepository.save(tag);
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll(Sort.by("name").ascending());
    }
}
