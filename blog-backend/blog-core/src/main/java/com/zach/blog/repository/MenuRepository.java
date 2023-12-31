package com.zach.blog.repository;

import com.zach.blog.enums.MenuType;
import com.zach.blog.model.Menu;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    Optional<Menu> findByName(String menuName);

    @Query(value = "" +
            "SELECT m from Menu  m " +
            "WHERE m.parentId = ?1 " +
            "AND m.menuType IN ?2 " +
            "ORDER BY m.displayOrder ASC")
    List<Menu> findSubMenusByTypes(Long rootMenuId, List<MenuType> menuTypes);

    List<Menu> findAllByParentId(Long parentId, Sort sort);

    boolean existsByParentId(Long id);
}
