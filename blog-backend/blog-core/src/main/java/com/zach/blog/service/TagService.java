package com.zach.blog.service;

import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Tag;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TagService {

    Page<Tag> getTags(Integer pageNum, Integer pageSize, String tagName, String description);

    Tag createTag(ApplicationUser user, String name, String description);

    void deleteTag(ApplicationUser user, Long tagId);

    void updateTag(ApplicationUser user, Long tagId, String name, String description);

    List<Tag> getAllTags();
}
