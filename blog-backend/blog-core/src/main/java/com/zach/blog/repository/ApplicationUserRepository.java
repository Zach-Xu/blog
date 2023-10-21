package com.zach.blog.repository;

import com.zach.blog.model.ApplicationUser;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long>, JpaSpecificationExecutor<ApplicationUser> {

    @EntityGraph(attributePaths = "roles")
    Optional<ApplicationUser> findByUsername(String username);

    @Query(value = "" +
            "SELECT u FROM ApplicationUser u " +
            "LEFT JOIN FETCH u.roles r " +
            "LEFT JOIN FETCH r.menus m " +
            "WHERE u.id = ?1 ")
    Optional<ApplicationUser> findUserRoleAndPermissionsById(Long id);

    boolean existsByEmail(String email);

    interface Specs {
        static Specification<ApplicationUser> containsUsername(String username) {
            return (root, query, builder) -> {
                String usernameLowerCase = username.toLowerCase();
                return builder.like(builder.lower(root.get("username")), "%" + usernameLowerCase + "%");
            };
        }

        static Specification<ApplicationUser> containsEmail(String email) {
            return (root, query, builder) -> {
                String emailLowerCase = email.toLowerCase();
                return builder.like(builder.lower(root.get("email")), "%" + emailLowerCase + "%");
            };
        }

        static Specification<ApplicationUser> isEnable(boolean enable) {
            return (root, query, builder) -> builder.equal(root.get("enable"), enable);
        }
    }

}
