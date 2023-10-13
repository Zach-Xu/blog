package com.zach.blog.repository;

import com.zach.blog.model.ApplicationUser;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    @EntityGraph(attributePaths = "roles")
    Optional<ApplicationUser> findByUsername(String username);

}
