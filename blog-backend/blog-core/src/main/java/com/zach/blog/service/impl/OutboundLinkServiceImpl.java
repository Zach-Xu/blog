package com.zach.blog.service.impl;

import com.zach.blog.dto.request.CreateLinkRequest;
import com.zach.blog.dto.request.UpdateLinkRequest;
import com.zach.blog.enums.AuditStatus;
import com.zach.blog.exception.SystemException;
import com.zach.blog.model.OutboundLink;
import com.zach.blog.repository.OutboundLinkRepository;
import com.zach.blog.service.OutboundLinkService;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.zach.blog.repository.OutboundLinkRepository.Specs.containsName;
import static com.zach.blog.repository.OutboundLinkRepository.Specs.isEnable;

@Service
@RequiredArgsConstructor
public class OutboundLinkServiceImpl implements OutboundLinkService {
    private final OutboundLinkRepository linkRepository;

    @Override
    public List<OutboundLink> getAllOutBoundLinks() {
        return linkRepository.findAllByAuditStatus(AuditStatus.ACCEPTED);
    }

    @Override
    public Page<OutboundLink> getOutBoundLinks(Integer pageNum, Integer pageSize, String name, Boolean enable) {
        Sort sort = Sort.by("name");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);

        Specification<OutboundLink> specs = Specification.where(null);
        if (Strings.hasText(name)) {
            specs = specs.and(containsName(name));
        }
        if (Objects.nonNull(enable)) {
            specs = specs.and(isEnable(enable));
        }

        return linkRepository.findAll(specs, pageRequest);
    }

    @Override
    public void createLink(CreateLinkRequest request) {
        OutboundLink link = new OutboundLink();
        link.setName(request.name());
        link.setUrl(request.url());
        link.setDescription(request.description());
        link.setLogo(request.logo());
        link.setAuditStatus(request.status());
        linkRepository.save(link);
    }

    @Override
    public OutboundLink getLinkById(Long id) {
        // ToDo: refactor exception handling
        return linkRepository.findById(id).orElseThrow(SystemException::new);
    }

    @Override
    public void updateLink(Long userId, Long id, UpdateLinkRequest request) {
        // ToDo: refactor exception
        OutboundLink link = linkRepository.findById(id).orElseThrow(SystemException::new);
        link.setUpdatedBy(userId);
        link.setName(request.name());
        link.setDescription(request.description());
        link.setUrl(request.url());
        link.setLogo(request.logo());
        link.setAuditStatus(request.status());
        linkRepository.save(link);
    }

    @Override
    public void deleteLink(Long id) {
        // ToDo: refactor exception
        OutboundLink link = linkRepository.findById(id).orElseThrow(SystemException::new);
        link.setDeleted(true);
        linkRepository.save(link);
    }
}
