package com.zach.blog.repository;


import com.zach.blog.dto.response.CommentQueryResult;
import com.zach.blog.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = """
            SELECT new com.zach.blog.dto.response.CommentQueryResult(c1.article.id, c1.id , c1.content, u.id , c1.createdTime, c1.rootCommentId, u.username, u.avatar)
            FROM Comment c1
            LEFT JOIN c1.user u
            WHERE c1.article.id = :articleId
            AND c1.rootCommentId = -1
            ORDER BY c1.createdTime ASC""")
    Page<CommentQueryResult> findRootArticleComments(@Param("articleId") Long articleId, Pageable pageable);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.CommentQueryResult(c1.article.id, c1.id , c2.id, c1.content, u.id , u2.id, c1.createdTime, c1.rootCommentId, u.username, u2.username, u.avatar)
            FROM Comment c1
            LEFT JOIN c1.user u
            LEFT JOIN c1.toComment c2
            LEFT JOIN c2.user u2
            WHERE c1.rootCommentId = :commentId
            ORDER BY c1.createdTime ASC
            """)
    Page<CommentQueryResult> findSubArticleComments(@Param("commentId") Long commentId, Pageable pageable);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.CommentQueryResult(c1.id, c1.rootCommentId, c1.content, c1.createdTime, c1.tempUsername, u.avatar)
            FROM Comment c1
            LEFT JOIN c1.user u
            WHERE c1.type = com.zach.blog.enums.CommentType.CONTACT
            AND c1.rootCommentId = -1
            ORDER BY c1.createdTime ASC
            """)
    Page<CommentQueryResult> findRootContactComments(Pageable pageable);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.CommentQueryResult(c1.id, c1.rootCommentId, c1.content, c1.createdTime, c1.tempUsername, u.avatar, c2.tempUsername)
            FROM Comment c1 
            LEFT JOIN c1.toComment c2 
            LEFT JOIN c1.user u
            WHERE c1.rootCommentId = :commentId
            ORDER BY c1.createdTime ASC 
            """)
    Page<CommentQueryResult> findSubContactComments(@Param("commentId") Long commentId, Pageable pageable);

    boolean existsByTempUsername(String username);

    @Query(value = """
            SELECT new com.zach.blog.dto.response.CommentQueryResult(c.content, c.createdTime, c.tempUsername, u.avatar)
            FROM Comment c
            LEFT JOIN c.user u
            ORDER BY c.createdTime DESC 
            """)
    Page<CommentQueryResult> findLatestComments(Pageable pageable);
}
