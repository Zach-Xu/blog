package com.zach.blog.repository;

import com.zach.blog.enums.AuditStatus;
import com.zach.blog.model.OutboundLink;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutboundLinkRepository extends JpaRepository<OutboundLink, Long>, JpaSpecificationExecutor<OutboundLink> {

    List<OutboundLink> findAllByAuditStatus(AuditStatus auditStatus);

    interface Specs {
        static Specification<OutboundLink> containsName(String name) {
            return (root, query, builder) -> {
                String nameLowerCase = name.toLowerCase();
                return builder.like(builder.lower(root.get("name")), "%" + nameLowerCase + "%");
            };
        }

        static Specification<OutboundLink> isEnable(boolean enable) {
            return (root, query, builder) -> builder.equal(root.get("enable"), enable);
        }
    }
}
