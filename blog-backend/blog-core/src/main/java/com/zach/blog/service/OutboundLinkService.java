package com.zach.blog.service;

import com.zach.blog.model.OutboundLink;

import java.util.List;

public interface OutboundLinkService {
    void createOutboundLinks(List<OutboundLink> links);

    List<OutboundLink> getAllOutBoundLinks();
}
