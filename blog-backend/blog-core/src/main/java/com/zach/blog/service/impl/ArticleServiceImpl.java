package com.zach.blog.service.impl;

import com.zach.blog.dto.request.UpdateArticleRequest;
import com.zach.blog.dto.request.WriteArticleRequest;
import com.zach.blog.enums.PublishStatus;
import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Article;
import com.zach.blog.model.Category;
import com.zach.blog.model.Tag;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.repository.CategoryRepository;
import com.zach.blog.repository.TagRepository;
import com.zach.blog.service.ArticleService;
import com.zach.blog.service.FileService;
import com.zach.blog.utils.RedisUtils;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.zach.blog.constants.RedisKeyPrefix.ARTICLE_VIEW_COUNT_KEY;
import static com.zach.blog.enums.code.ResourceNotFoundCode.ARTICLE_NOT_FOUND;
import static com.zach.blog.repository.ArticleRepository.Specs.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;
    private final RedisUtils redisUtils;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final FileService fileService;
    private final ApplicationUserRepository userRepository;

    @Override
    public List<Article> getHotArticles() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        return articleRepository.findHotArticles(PublishStatus.PUBLISHED, pageRequest);
    }

    @Override
    public Page<Article> getArticles(Integer pageNum, Integer pageSize, Long categoryId) {
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, Sort.by("pinned").descending());

        Specification<Article> spec = byPublishStatus(PublishStatus.PUBLISHED);

        if (!Objects.isNull(categoryId)) {
            spec = spec.and(byCategoryId(categoryId));
        }

        Page<Article> articlePage = articleRepository.findAll(spec, pageRequest);
        return articlePage;
    }

    @Override
    public Article getArticleDetail(Long categoryId) {
        Article article = articleRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(ARTICLE_NOT_FOUND));
        String viewCountCache = redisUtils.getMapValue(ARTICLE_VIEW_COUNT_KEY, String.valueOf(categoryId));
        if (Strings.hasText(viewCountCache)) {
            Long viewCount = Long.valueOf(viewCountCache);
            article.setViewCount(viewCount);
        }else{
            redisUtils.setMapValue(ARTICLE_VIEW_COUNT_KEY, String.valueOf(categoryId), String.valueOf(article.getViewCount()));
        }
        return article;
    }

    @Override
    public void updateViewCount(Long articleId) {
        redisUtils.increaseMapValue(ARTICLE_VIEW_COUNT_KEY, String.valueOf(articleId), 1);
    }

    @Transactional
    @Override
    public void createArticle(Long userId, WriteArticleRequest writeArticleRequest) throws IOException {

        Article article = new Article();
        article.setViewCount(0L);
        if (Objects.nonNull(writeArticleRequest.image())) {
            String thumbnail = fileService.UploadFile(writeArticleRequest.image());
            article.setThumbnail(thumbnail);
        }

        article.setTitle(writeArticleRequest.title());
        article.setSummary(writeArticleRequest.summary());
        article.setContent(writeArticleRequest.content());

        article.setPublishStatus(writeArticleRequest.publishStatus());

        article.setPinned(writeArticleRequest.pinned());
        article.setAllowedComment(writeArticleRequest.allowedComment());
        article.setAuthor(userRepository.getReferenceById(userId));

        Category category = categoryRepository.getReferenceById(writeArticleRequest.categoryId());
        article.setCategory(category);
        Set<Tag> tags = writeArticleRequest.tagIds().stream()
                .map(id -> tagRepository.getReferenceById(id))
                .collect(Collectors.toSet());
        article.setTags(tags);
        articleRepository.save(article);
    }

    @Override
    public Page<Article> getArticles(Integer pageNum, Integer pageSize, String title, String summary) {
        Sort sort = Sort.by("title").ascending().and(Sort.by("createdTime").descending());
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
        Specification<Article> spec = Specification.where(null);
        if (Strings.hasText(title)) {
            spec = spec.and(containsTitle(title));
        }
        if (Strings.hasText(summary)) {
            spec = spec.and(containsSummary(summary));
        }

        Page<Article> articlePage = articleRepository.findAll(spec, pageRequest);
        return articlePage;
    }

    @Override
    public Article updateArticle(Long id, UpdateArticleRequest updateArticleRequest) throws IOException {
        Article article = articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ARTICLE_NOT_FOUND));

        if (Objects.nonNull(updateArticleRequest.image())) {
            String thumbnail = fileService.UploadFile(updateArticleRequest.image());
            article.setThumbnail(thumbnail);
        }

        article.setTitle(updateArticleRequest.title());
        article.setContent(updateArticleRequest.content());
        article.setSummary(updateArticleRequest.summary());
        article.setPinned(updateArticleRequest.pinned());
        article.setAllowedComment(updateArticleRequest.allowedComment());
        article.setPublishStatus(updateArticleRequest.publishStatus());

        // Update association
        article.setCategory(categoryRepository.getReferenceById(updateArticleRequest.categoryId()));
        Set<Tag> tags = updateArticleRequest.tagIds().stream()
                .map(tagId -> tagRepository.getReferenceById(tagId))
                .collect(Collectors.toSet());
        article.setTags(tags);

        return articleRepository.save(article);
    }

    @Override
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ARTICLE_NOT_FOUND));
        article.setDeleted(true);
        articleRepository.save(article);
    }

    @Transactional
    @Override
    public void updateArticleImage(Long articleId, ApplicationUser user, MultipartFile image) throws IOException {
        Article article = articleRepository.findByIdAndAuthorId(articleId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ARTICLE_NOT_FOUND));

        String thumbnail = fileService.UploadFile(image);
        article.setThumbnail(thumbnail);

        articleRepository.save(article);
    }

    @Override
    public List<Article> getFeaturedArticles() {

        // find the Ids of the pinned articles
        Page<Long> pinPage = articleRepository.findArticleIds(true, PageRequest.of(0, 5));

        int pinnedCount = pinPage.getNumberOfElements();

        List<Long> featuredArticleIds = new ArrayList<>();
        featuredArticleIds.addAll(pinPage.getContent());

        // fetch the remaining from unpinned articles if the number of pinned articles is less than 5
        if(pinnedCount < 5) {
            Page<Long> unpinnedPage = articleRepository.findArticleIds(false, PageRequest.of(0, 5 - pinnedCount));
            featuredArticleIds.addAll(unpinnedPage.getContent());
        }

        return articleRepository.findAllById(featuredArticleIds);

    }

}
