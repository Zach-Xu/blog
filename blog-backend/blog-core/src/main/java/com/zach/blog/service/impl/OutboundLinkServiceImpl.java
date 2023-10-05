package com.zach.blog.service.impl;

import com.zach.blog.enums.AuditStatus;
import com.zach.blog.model.OutboundLink;
import com.zach.blog.repository.OutboundLinkRepository;
import com.zach.blog.service.OutboundLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OutboundLinkServiceImpl implements OutboundLinkService {

    private final OutboundLinkRepository linkRepository;

    @Override
    public void createOutboundLinks(List<OutboundLink> links) {
        linkRepository.saveAll(links);
    }

    @Override
    public List<OutboundLink> getAllOutBoundLinks() {
        return linkRepository.findAllByAuditStatus(AuditStatus.ACCEPTED);
    }
}
