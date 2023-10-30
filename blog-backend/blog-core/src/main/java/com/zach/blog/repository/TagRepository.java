package com.zach.blog.repository;

import com.zach.blog.model.Tag;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>, JpaSpecificationExecutor<Tag> {

    boolean existsByNameIgnoreCase(String name);

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
