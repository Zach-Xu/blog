package com.zach.blog.runner;

import com.zach.blog.projection.ArticleViewCount;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.zach.blog.constants.RedisKeyPrefix.ARTICLE_VIEW_COUNT_KEY;

@Component
@RequiredArgsConstructor
@Order(2)
public class ArticleViewCountLoader implements CommandLineRunner {
    private final ArticleRepository articleRepository;
    private final RedisUtils redisUtils;

    @Override
    public void run(String... args) throws Exception {
        List<ArticleViewCount> articles = articleRepository.findAllBy();
        Map<String, String> viewCountMap = articles.stream().
                collect(Collectors.toMap(article -> String.valueOf(article.getId()), article ->
                        String.valueOf(article.getViewCount())
                ));

        redisUtils.setMap(ARTICLE_VIEW_COUNT_KEY, viewCountMap);
    }
}
