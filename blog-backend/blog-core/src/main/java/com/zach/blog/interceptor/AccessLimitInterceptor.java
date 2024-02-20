package com.zach.blog.interceptor;

import com.zach.blog.annotation.AccessLimit;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.utils.IPUtils;
import com.zach.blog.utils.JsonUtils;
import com.zach.blog.utils.RedisUtils;
import com.zach.blog.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class AccessLimitInterceptor implements HandlerInterceptor {

    private final RedisUtils redisUtils;
    private final IPUtils ipUtils;
    private final ResponseUtils responseUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean result = true;
        // Handler 是否为 HandlerMethod 实例
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            AccessLimit accessLimit = handlerMethod.getMethodAnnotation(AccessLimit.class);

            if (Objects.nonNull(accessLimit)) {
                int seconds = accessLimit.seconds();
                int maxCount = accessLimit.maxCount();
                String ip = ipUtils.getIpAddress();
                String method = request.getMethod();
                String requestUri = request.getRequestURI();
                String redisKey = ip + ":" + method + ":" + requestUri;
                try {
                    Long count = redisUtils.increase(redisKey, 1);

                    if (Objects.nonNull(count) && count == 1) {
                        redisUtils.setExpire(redisKey, seconds, TimeUnit.SECONDS);
                    } else if (count > maxCount) {
                        responseUtils.renderString(response, JsonUtils.stringify(ResponseResult.error(accessLimit.msg())));
                        result = false;
                    }
                } catch (RedisConnectionFailureException e) {
                    log.error("redis error: " + e.getMessage());
                    result = false;
                }
            }
        }
        return result;
    }
}
