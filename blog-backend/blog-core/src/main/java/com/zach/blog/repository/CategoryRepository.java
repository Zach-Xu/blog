package com.zach.blog.repository;

import com.zach.blog.enums.PublishStatus;
import com.zach.blog.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    @Query(value = "SELECT c FROM Category c WHERE c.id IN " +
            "(SELECT a.category.id FROM Article a GROUP BY a.category.id HAVING SUM(CASE WHEN a.publishStatus = :status THEN 1 ELSE 0 END) > 0)")
    List<Category> findCategoriesWithPublishedArticles(@Param("status") PublishStatus status);


}
