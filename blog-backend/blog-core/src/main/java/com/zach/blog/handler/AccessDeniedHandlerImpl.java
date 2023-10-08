package com.zach.blog.handler;

import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.enums.HttpStatusCode;
import com.zach.blog.utils.JsonUtils;
import com.zach.blog.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {

    private final ResponseUtils responseUtils;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) {
        ResponseResult<?> result = ResponseResult.error(HttpStatusCode.FORBIDDEN);
        responseUtils.renderString(response, JsonUtils.stringify(result));
    }
}
