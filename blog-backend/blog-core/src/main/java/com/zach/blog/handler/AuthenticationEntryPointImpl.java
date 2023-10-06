package com.zach.blog.handler;

import com.zach.blog.dto.ResponseResult;
import com.zach.blog.enums.HttpStatusCode;
import com.zach.blog.utils.JsonUtils;
import com.zach.blog.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    private final ResponseUtils responseUtils;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)  {
        ResponseResult<?> result = ResponseResult.error(HttpStatusCode.REQUIRE_LOGIN);
        responseUtils.renderString(response, JsonUtils.stringify(result));
    }
}
