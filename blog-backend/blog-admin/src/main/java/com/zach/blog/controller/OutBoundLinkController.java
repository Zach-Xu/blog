package com.zach.blog.controller;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.dto.response.LinkResponse;
import com.zach.blog.dto.request.CreateLinkRequest;
import com.zach.blog.dto.request.UpdateLinkRequest;
import com.zach.blog.dto.response.PageResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.OutboundLink;
import com.zach.blog.model.SessionUser;
import com.zach.blog.service.OutboundLinkService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/links")
public class OutBoundLinkController {
    private final OutboundLinkService linkService;

    @AccessLimit(maxCount = 3)
    @PreAuthorize("hasAnyAuthority('system')")
    @GetMapping
    public ResponseResult<?> getLinks(@RequestParam(defaultValue = "0") Integer pageNum, @RequestParam(defaultValue = "5") Integer pageSize,
                                      @RequestParam(required = false) String name, @RequestParam(required = false) Boolean enable) {
        Page<OutboundLink> page = linkService.getOutBoundLinks(pageNum, pageSize, name, enable);
        List<LinkResponse> links = BeanCopyUtils.copyBeanList(page.getContent(), LinkResponse.class);
        PageResponse response = new PageResponse(links, page.getTotalPages(), links.size());
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 3)
    @PreAuthorize("hasAnyAuthority('system')")
    @GetMapping("/{id}")
    public ResponseResult<?> getLinkById(@PathVariable Long id) {
        OutboundLink link = linkService.getLinkById(id);
        LinkResponse response = BeanCopyUtils.copyBean(link, LinkResponse.class);
        return ResponseResult.ok(response);
    }

    @AccessLimit(maxCount = 3)
    @PreAuthorize("hasAnyAuthority('system')")
    @PostMapping
    public ResponseResult<?> createLink(@RequestBody CreateLinkRequest request) {
        linkService.createLink(request);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 3)
    @PreAuthorize("hasAnyAuthority('system')")
    @PutMapping("/{id}")
    public ResponseResult<?> updateLink(@PathVariable Long id, @RequestBody UpdateLinkRequest request, @AuthenticationPrincipal SessionUser user) {
        linkService.updateLink(user.getId(), id, request);
        return ResponseResult.ok();
    }

    @AccessLimit(maxCount = 3)
    @PreAuthorize("hasAnyAuthority('system')")
    @DeleteMapping("/{id}")
    public ResponseResult<?> deleteLink(@PathVariable Long id){
        linkService.deleteLink(id);
        return ResponseResult.ok();
    }

}
