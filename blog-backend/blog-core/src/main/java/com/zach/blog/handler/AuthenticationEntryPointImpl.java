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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    private final ResponseUtils responseUtils;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ResponseResult<?> result = new ResponseResult<>(HttpStatus.UNAUTHORIZED.value(), authException.getMessage());
        responseUtils.renderString(response, JsonUtils.stringify(result));
    }
}
