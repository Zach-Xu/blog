package com.zach.blog.model;

import com.zach.blog.enums.AuditStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "blog_outbound_link")
@Getter
@Setter
@SQLDelete(sql = "UPDATE blog_outbound_link SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class OutboundLink extends BaseEntity{

    private String name;

    private String logo;

    private String description;

    private String url;

    @Column(name = "audit_status")
    @Enumerated(EnumType.ORDINAL)
    private AuditStatus auditStatus;


    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "updated_by")
    private Long updatedBy;

}
