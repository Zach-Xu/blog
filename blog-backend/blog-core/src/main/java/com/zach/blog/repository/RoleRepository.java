package com.zach.blog.repository;

import com.zach.blog.enums.RoleName;
import com.zach.blog.model.Role;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>, JpaSpecificationExecutor<Role> {

    Optional<Role> findByRoleName(String roleName);

    List<Role> findAllByEnable(boolean enable);

    @Query(value = "" +
            "SELECT r from Role r " +
            "LEFT JOIN FETCH r.menus m " +
            "WHERE m.parentId = -1L AND r.id = ?1 " +
            "ORDER BY m.displayOrder ASC")
    Optional<Role> findRoleAndRootMenusById(Long roleId);

    @Query(value = "" +
            "SELECT r from Role r " +
            "LEFT JOIN FETCH r.menus " +
            "WHERE r.id = ?1")
    Optional<Role> findRoleWithMenus(Long roleId);

    interface Specs {
        static Specification<Role> containsRoleName(String roleName) {
            return (root, query, builder) -> {
                String roleNameLowerCase = roleName.toLowerCase();
                return builder.like(builder.lower(root.get("roleName")), "%" + roleNameLowerCase + "%");
            };
        }

        static Specification<Role> isEnable(boolean enable) {
            return (root, query, builder) ->
                    builder.equal(root.get("enable"), enable);
        }

    }
}
