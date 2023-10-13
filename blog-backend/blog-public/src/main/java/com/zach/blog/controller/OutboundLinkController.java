package com.zach.blog.controller;

import com.zach.blog.dto.response.OutboundLinkResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.model.OutboundLink;
import com.zach.blog.service.OutboundLinkService;
import com.zach.blog.utils.BeanCopyUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Outbound Link", description = "Manage outbound links")
@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
public class OutboundLinkController {

    private final OutboundLinkService linkService;

    @Operation(summary = "Get Outbound links", description = "Retrieve a list of outbound links")
    @GetMapping
    public ResponseResult<?> getAllOutBoundLinks(){
        List<OutboundLink> links = linkService.getAllOutBoundLinks();
        List<OutboundLinkResponse> linksResponse = BeanCopyUtils.copyBeanList(links, OutboundLinkResponse.class);
        return ResponseResult.ok(linksResponse);
    }
}
