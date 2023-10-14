package com.zach.blog.repository;

import com.zach.blog.enums.RoleName;
import com.zach.blog.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(RoleName roleName);

    @Query(value = "SELECT r from Role r " +
            "LEFT JOIN FETCH r.menus m " +
            "WHERE m.parentId = -1L AND r.id = ?1 " +
            "ORDER BY m.displayOrder ASC")
    Optional<Role> findRoleAndRootMenusById(Long roleId);
}
