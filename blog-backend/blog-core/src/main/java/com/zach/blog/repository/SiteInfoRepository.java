package com.zach.blog.repository;

import com.zach.blog.dto.response.AboutMeQueryResult;
import com.zach.blog.dto.response.SiteInfoQueryResult;
import com.zach.blog.model.SiteInfo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SiteInfoRepository extends JpaRepository<SiteInfo, Long> {

    @EntityGraph(attributePaths = {
            "owner",
            "socials"
    })
    @Override
    Optional<SiteInfo> findById(Long id);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.SiteInfoQueryResult(s.hostSince, s.visitCount)
            FROM SiteInfo s
            WHERE s.id = :siteInfoId
            """)
    Optional<SiteInfoQueryResult> findSiteStats(@Param("siteInfoId") Long siteInfoId);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.AboutMeQueryResult(s.aboutMe, o.avatar)
            FROM SiteInfo s
            JOIN s.owner o
            WHERE s.id = :siteInfoId
            """)
    Optional<AboutMeQueryResult> findAboutMe(@Param("siteInfoId") Long siteInfoId);
}
