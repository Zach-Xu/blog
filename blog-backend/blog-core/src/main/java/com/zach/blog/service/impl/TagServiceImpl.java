package com.zach.blog.service.impl;

import com.zach.blog.model.Tag;
import com.zach.blog.repository.TagRepository;
import com.zach.blog.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }
}
