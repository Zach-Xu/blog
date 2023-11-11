package com.zach.blog.controller;

import com.zach.blog.annotation.Validate;
import com.zach.blog.dto.request.CreateTagRequest;
import com.zach.blog.dto.response.TagResponse;
import com.zach.blog.dto.request.UpdateTagRequest;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Tag;
import com.zach.blog.service.TagService;
import com.zach.blog.utils.BeanCopyUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseResult<?> getTags(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                     @RequestParam(required = false) String name, @RequestParam(required = false) String description){
        Page<Tag> page = tagService.getTags(pageNum, pageSize, name, description);
        List<TagResponse> tags = BeanCopyUtils.copyBeanList(page.getContent(), TagResponse.class);
        int totalPages = page.getTotalPages();
        PageResponse pageResponse = new PageResponse(tags, totalPages, tags.size());
        return ResponseResult.ok(pageResponse);
    }

    @GetMapping("/all")
    public ResponseResult<?> getAllTags(){
        List<Tag> allTags = tagService.getAllTags();
        List<TagResponse> tags = BeanCopyUtils.copyBeanList(allTags, TagResponse.class);
        return ResponseResult.ok(tags);
    }

    @Validate
    @PostMapping
    public ResponseResult<?> createTag(@AuthenticationPrincipal ApplicationUser user, @RequestBody @Valid CreateTagRequest createTagRequest, BindingResult bindingResult){
        Tag tag = tagService.createTag(user, createTagRequest.name(), createTagRequest.description());
        TagResponse response = BeanCopyUtils.copyBean(tag, TagResponse.class);
        return ResponseResult.ok(response);
    }

    @Validate
    @PutMapping("/{id}")
    public ResponseResult<?> updateTag(@AuthenticationPrincipal ApplicationUser user, @PathVariable("id") Long tagId, @RequestBody @Valid UpdateTagRequest updateTagRequest, BindingResult bindingResult){
        tagService.updateTag(user, tagId, updateTagRequest.name(), updateTagRequest.description());
        return ResponseResult.ok();
    }

    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteTag(@AuthenticationPrincipal ApplicationUser user, @PathVariable("id") Long tagId){
        tagService.deleteTag(user, tagId);
        return ResponseResult.ok();
    }
}
