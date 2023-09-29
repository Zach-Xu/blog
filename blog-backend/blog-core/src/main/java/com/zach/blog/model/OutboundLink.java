package com.zach.blog.model;

import com.zach.blog.enums.AuditStatus;
import com.zach.blog.enums.DeleteFlag;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "blog_outbound_link")
@Getter
@Setter
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

    @Column(name = "delete_flag")
    @Enumerated(EnumType.ORDINAL)
    private DeleteFlag deleteFlag;

    public OutboundLink(){
        this.deleteFlag = DeleteFlag.LIVE;
    }
}
