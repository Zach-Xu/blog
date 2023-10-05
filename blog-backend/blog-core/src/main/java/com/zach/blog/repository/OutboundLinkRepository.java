package com.zach.blog.repository;

import com.zach.blog.enums.AuditStatus;
import com.zach.blog.model.OutboundLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutboundLinkRepository extends JpaRepository<OutboundLink, Long> {

    List<OutboundLink> findAllByAuditStatus(AuditStatus auditStatus);
}
