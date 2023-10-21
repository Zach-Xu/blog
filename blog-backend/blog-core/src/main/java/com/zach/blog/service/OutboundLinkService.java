package com.zach.blog.service;

import com.zach.blog.dto.request.CreateLinkRequest;
import com.zach.blog.dto.request.UpdateLinkRequest;
import com.zach.blog.model.OutboundLink;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OutboundLinkService {

    List<OutboundLink> getAllOutBoundLinks();

    Page<OutboundLink> getOutBoundLinks(Integer pageNum, Integer pageSize, String name, Boolean enable);

    void createLink(CreateLinkRequest request);

    OutboundLink getLinkById(Long id);

    void updateLink(Long userId, Long id, UpdateLinkRequest request);

    void deleteLink(Long id);
}
