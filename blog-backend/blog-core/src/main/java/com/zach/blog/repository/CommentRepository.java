package com.zach.blog.repository;


import com.zach.blog.dto.CommentQueryResult;
import com.zach.blog.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = """
            SELECT new com.zach.blog.dto.CommentQueryResult(c1.article.id, c1.id , c1.content, u.id , c1.createdTime, c1.rootCommentId, u.username, u2.username )
            FROM Comment c1
            LEFT JOIN c1.user u
            LEFT JOIN c1.toComment c2
            LEFT JOIN c2.user u2
            WHERE c1.article.id = :articleId
            AND c1.rootCommentId = -1""")
    Page<CommentQueryResult> findRootCommentsByArticleId(@Param("articleId") Long articleId, Pageable pageable);

    @Query(value = """
            SELECT new com.zach.blog.dto.CommentQueryResult(c1.article.id, c1.id , c1.content, u.id , c1.createdTime, c1.rootCommentId, u.username, u2.username )
            FROM Comment c1
            LEFT JOIN c1.user u
            LEFT JOIN c1.toComment c2
            LEFT JOIN c2.user u2
            WHERE c1.rootCommentId = :commentId""")
    Page<CommentQueryResult> findSubCommentsByRootCommentId(@Param("commentId") Long commentId, Pageable pageable);

}
