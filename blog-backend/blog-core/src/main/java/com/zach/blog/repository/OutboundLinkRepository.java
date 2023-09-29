package com.zach.blog.repository;

import com.zach.blog.model.OutboundLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutboundLinkRepository extends JpaRepository<OutboundLink, Long> {
}
