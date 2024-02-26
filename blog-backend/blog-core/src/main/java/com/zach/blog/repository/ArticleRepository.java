package com.zach.blog.repository;

import com.zach.blog.dto.response.AdjacentArticle;
import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Article;

import com.zach.blog.model.Tag;
import com.zach.blog.projection.ArticleViewCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {

    @EntityGraph(attributePaths = {
            "category",
            "author",
    })
    List<Article> findAll();

    Optional<Article> findByIdAndAuthorId(Long articleId, Long authorId);

    @Override
    @EntityGraph(attributePaths = {
            "category",
            "tags"
    })
    Optional<Article> findById(Long id);

    @EntityGraph(attributePaths = {
            "category",
            "tags"
    })
    @Override
    List<Article> findAllById(Iterable<Long> longs);

    @Query(value = "" +
            "SELECT a.id FROM Article a " +
            "WHERE a.publishStatus = com.zach.blog.enums.PublishStatus.PUBLISHED " +
            "AND a.pinned = :pinned ")
    Page<Long> findArticleIds(@Param("pinned") boolean pinned, Pageable pageable);

    @EntityGraph(attributePaths = {
            "category",
            "tags"
    })
    @Override
    Page<Article> findAll(Specification<Article> spec, Pageable pageable);

    @Query(value = "" +
            "SELECT a FROM Article a " +
            "LEFT JOIN FETCH a.category c " +
            "JOIN FETCH a.author " +
            "WHERE a.publishStatus = :status " +
            "ORDER BY a.viewCount ASC")
    List<Article> findHotArticles(@Param("status") PublishStatus status, Pageable pageable);

    List<ArticleViewCount> findAllBy();

    @Query(value = """
            SELECT new com.zach.blog.dto.response.AdjacentArticle(a.id, a.title, a.thumbnail)
            FROM Article a
            WHERE a.id < :articleId
            AND a.publishStatus = com.zach.blog.enums.PublishStatus.PUBLISHED
            ORDER BY a.id DESC 
            """)
    Page<AdjacentArticle> findPreviousArticle(@Param("articleId") Long articleId, Pageable pageable);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.AdjacentArticle(a.id, a.title, a.thumbnail)
            FROM Article a
            WHERE a.id > :articleId
            AND a.publishStatus = com.zach.blog.enums.PublishStatus.PUBLISHED
            ORDER BY a.id ASC 
            """)
    Page<AdjacentArticle> findNextArticle(@Param("articleId") Long articleId, Pageable pageable);

    interface Specs {
        static Specification<Article> byCategoryId(Long categoryId) {
            return (root, query, builder) ->
                    builder.equal(root.get("category").get("id"), categoryId);
        }

        static Specification<Article> byTagId(Tag tag){
            return (root, query, builder) ->
                    builder.isMember(tag, root.get("tags"));
        }

        static Specification<Article> byPublishStatus(PublishStatus publishStatus) {
            return (root, query, builder) ->
                    builder.equal(root.get("publishStatus"), publishStatus);
        }

        static Specification<Article> byPinned(Boolean isPinned) {
            return (root, query, builder) ->
                    builder.equal(root.get("pinned"), isPinned);
        }

        static Specification<Article> containsTitle(String title) {
            return (root, query, builder) -> {
                String titleLowerCase = title.toLowerCase();
                return builder.like(builder.lower(root.get("title")), "%" + titleLowerCase + "%");
            };
        }

        static Specification<Article> containsSummary(String summary) {
            return (root, query, builder) -> {
                String summaryLowerCase = summary.toLowerCase();
                return builder.like(builder.lower(root.get("summary")), "%" + summaryLowerCase + "%");
            };
        }

        static Specification<Article> byDeleted(Boolean isDeleted) {
            return (root, query, builder) ->
                    builder.equal(root.get("deleted"), isDeleted);
        }

    }

}
