package com.zach.blog.repository;

import com.zach.blog.model.ApplicationUser;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    @EntityGraph(attributePaths = "roles")
    Optional<ApplicationUser> findByUsername(String username);

    @Query(value = "" +
            "SELECT u FROM ApplicationUser u " +
            "LEFT JOIN FETCH u.roles r " +
            "LEFT JOIN FETCH r.menus m " +
            "WHERE u.id = ?1 ")
    Optional<ApplicationUser> findUserRoleAndPermissionsById(Long id);

}
