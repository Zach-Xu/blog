package com.zach.blog.repository;

import com.zach.blog.dto.response.CategoryStatsResponse;
import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Category;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {

    Optional<Category> findByName(String name);

    boolean existsByName(String name);

    @Query(value = "" +
            "SELECT c FROM Category c " +
            "WHERE c.id IN " +
            "(SELECT a.category.id FROM Article a " +
            "GROUP BY a.category.id " +
            "HAVING SUM(CASE WHEN a.publishStatus = :status THEN 1 ELSE 0 END) > 0)")
    List<Category> findCategoriesWithPublishedArticles(@Param("status") PublishStatus status);

    List<Category> findAllByPid(Long parentId);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.CategoryStatsResponse(c.id, c.name, COUNT (a))
            FROM Category c
            JOIN Article  a
            ON c.id = a.category.id
            GROUP BY c.id
            HAVING COUNT (a) > 0
            """)
    List<CategoryStatsResponse> getCategoryStats();

    interface Specs {
        static Specification<Category> containsName(String name) {
            return (root, query, builder) -> {
                String nameLowerCase = name.toLowerCase();
                return builder.like(builder.lower(root.get("name")), "%" + nameLowerCase + "%");
            };
        }

        static Specification<Category> isEnable(boolean enable) {
            return (root, query, builder) -> builder.equal(root.get("enable"), enable);
        }
    }

}
