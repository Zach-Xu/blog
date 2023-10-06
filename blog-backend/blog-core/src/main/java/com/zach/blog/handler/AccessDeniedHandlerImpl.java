package com.zach.blog.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zach.blog.dto.ResponseResult;
import com.zach.blog.utils.JsonUtils;
import com.zach.blog.utils.ResponseUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {

    private final ResponseUtils responseUtils;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ResponseResult<?> result = new ResponseResult<>(HttpStatus.FORBIDDEN.value(), "No permission to perform such action");
        responseUtils.renderString(response, JsonUtils.stringify(request));
    }
}
