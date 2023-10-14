package com.zach.blog.repository;

import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Article;

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

    @Override
    @EntityGraph(attributePaths = {
            "category"
    })
    Optional<Article> findById(Long id);

    @Override
    @EntityGraph(attributePaths = {
            "category"
    })
    Page<Article> findAll(Specification<Article> spec, Pageable pageable);

    @Query(value = "SELECT a FROM Article a LEFT JOIN FETCH a.category c JOIN FETCH a.author" +
            " WHERE a.publishStatus = :status ORDER BY a.viewCount ASC")
    List<Article> findHotArticles(@Param("status") PublishStatus status, Pageable pageable);

    List<ArticleViewCount> findAllBy();

    interface Specs {
        static Specification<Article> byCategoryId(Long categoryId) {
            return (root, query, builder) ->
                    builder.equal(root.get("category").get("id"), categoryId);
        }

        static Specification<Article> byPublishStatus(PublishStatus publishStatus) {
            return (root, query, builder) ->
                    builder.equal(root.get("publishStatus"), publishStatus);
        }

//        static Specification<Article> orderByPinned(Specification<Article> spec){
//            return (root, query, builder) -> {
//                query.orderBy(builder.desc(root.get("pinned")));
//                return spec.toPredicate(root, query, builder);
//            };
//        }
    }

}
