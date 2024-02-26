package com.zach.blog.repository;

import com.zach.blog.dto.response.TagStatsResponse;
import com.zach.blog.model.Tag;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>, JpaSpecificationExecutor<Tag> {

    boolean existsByNameIgnoreCase(String name);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.TagStatsResponse(c.id, c.name, COUNT(a))
            FROM Article a
            JOIN a.tags c
            where a.publishStatus = com.zach.blog.enums.PublishStatus.PUBLISHED
            GROUP BY c.id
            HAVING COUNT (a) > 0
            """)
    List<TagStatsResponse> getTagStats();


    @Query(value = """
    SELECT COUNT(t) 
    FROM Tag t WHERE t IN (
     SELECT t
            FROM Article a
            JOIN a.tags t
            WHERE a.publishStatus = com.zach.blog.enums.PublishStatus.PUBLISHED
            GROUP BY t.id
            HAVING COUNT (a) > 0)
    """)
    Long getTagCount();

    interface Specs {
        static Specification<Tag> containsTagName(String tagName) {
            return (root, query, builder) -> {
                String tagNameLowerCase = tagName.toLowerCase();
                return builder.like(builder.lower(root.get("name")), "%" + tagNameLowerCase + "%");
            };
        }

        static Specification<Tag> containsDescription(String description) {
            return (root, query, builder) -> {
                String descriptionLowerCase = description.toLowerCase();
                return builder.like(builder.lower(root.get("description")), "%" + descriptionLowerCase + "%");
            };
        }
    }
}
