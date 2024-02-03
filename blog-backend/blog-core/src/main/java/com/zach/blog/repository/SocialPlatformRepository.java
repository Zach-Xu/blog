package com.zach.blog.repository;

import com.zach.blog.model.SocialPlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialPlatformRepository extends JpaRepository<SocialPlatform, Long> {
}
