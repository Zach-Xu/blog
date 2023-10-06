package com.zach.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @JsonIgnore
    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    private boolean deleted;

    public BaseEntity(){
        this.deleted = false;
    }
}
