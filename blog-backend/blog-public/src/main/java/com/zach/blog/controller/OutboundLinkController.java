package com.zach.blog.controller;

import com.zach.blog.dto.OutboundLinkResponse;
import com.zach.blog.dto.ResponseResult;
import com.zach.blog.model.OutboundLink;
import com.zach.blog.service.OutboundLinkService;
import com.zach.blog.utils.BeanCopyUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
public class OutboundLinkController {

    private final OutboundLinkService linkService;

    @GetMapping
    public ResponseResult<?> getAllOutBoundLinks(){
        List<OutboundLink> links = linkService.getAllOutBoundLinks();
        List<OutboundLinkResponse> linksResponse = BeanCopyUtils.copyBeanList(links, OutboundLinkResponse.class);
        return ResponseResult.ok(linksResponse);
    }
}
