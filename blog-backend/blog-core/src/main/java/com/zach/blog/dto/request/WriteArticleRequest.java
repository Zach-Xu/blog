package com.zach.blog.dto.request;

import com.zach.blog.enums.PublishStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record WriteArticleRequest(
        @NotBlank(message = "Title must be provided")
        String title,

        @NotBlank(message = "Content must be provided")
        String content,

        @NotNull(message = "Category must be specified")
        Long categoryId,

        @Size(min = 1, message = "At least one tag is required")
        List<Long> tagIds,

        @NotNull(message = "Status of the article must be specified")
        PublishStatus publishStatus,

        @NotBlank(message = "Summary must be provided")
        String summary,

        @NotNull(message = "Whether to pin this article must be specified")
        Boolean pinned,

        @NotNull(message = "Whether to allow comment must be specified")
        Boolean allowedComment,

        MultipartFile image
) {

}
