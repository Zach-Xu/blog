package com.zach.blog.job;

import com.zach.blog.utils.RedisUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static com.zach.blog.constants.RedisKeyPrefix.ARTICLE_VIEW_COUNT_KEY;

@Component
@RequiredArgsConstructor
@Slf4j
public class UpdateViewCountJob {

    private final RedisUtils redisUtils;

    @PersistenceContext
    private final EntityManager entityManager;

    @Scheduled(cron = "0 30 0/8 * * ?")
    @Transactional
    public void updateViewCount() {
        log.info("Scheduled tasks starting .....");
        Map<?, ?> viewCountMap = redisUtils.getMap(ARTICLE_VIEW_COUNT_KEY);
        StringBuilder updateQuery = new StringBuilder("UPDATE blog_article SET view_count = CASE id ");
        for (Map.Entry<?, ?> entry : viewCountMap.entrySet()) {
            long articleId = Long.parseLong((String) entry.getKey());
            long newViewCount = Long.parseLong((String) entry.getValue());
            updateQuery.append("WHEN ").append(articleId).append(" THEN ").append(newViewCount).append(" ");
        }

        updateQuery.append("ELSE view_count END");
        entityManager.createNativeQuery(updateQuery.toString()).executeUpdate();
        log.info("Scheduled tasks ending .....");
    }
}

