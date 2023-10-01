package com.zach.blog.repository;

import com.zach.blog.enums.DeleteFlag;
import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @EntityGraph(attributePaths = {
            "category",
            "author",
    })
    List<Article> findAll();

    default List<Article> findHotArticles(Pageable pageable) {
        return findHotArticles(PublishStatus.PUBLISHED, DeleteFlag.LIVE, pageable);
    }

    @Query(value = "select a from Article a left join fetch a.category c join fetch a.author where a.publishStatus = :status and a.deleteFlag = :flag  order by a.viewCount asc")
    List<Article> findHotArticles(@Param("status") PublishStatus status, @Param("flag") DeleteFlag deleteFlag, Pageable pageable);


}
