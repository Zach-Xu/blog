package com.zach.blog.filter;


import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.enums.HttpStatusCode;
import com.zach.blog.exception.RequireLoginException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.utils.JsonUtils;
import com.zach.blog.utils.JwtUtils;
import com.zach.blog.utils.RedisUtils;
import com.zach.blog.utils.ResponseUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final ResponseUtils responseUtils;
    private final RedisUtils redisUtils;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        if (Strings.isEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authorizationHeader.substring(7);

        try {
            if (jwtUtils.validateJwtToken(jwt)) {
                Long userId = jwtUtils.extractUserId(jwt);

                ApplicationUser user = redisUtils.get(USER_KEY + userId, ApplicationUser.class);

                if (Objects.isNull(user)) {
                    throw new RequireLoginException();
                }
                // user is authenticated if no exception thrown
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getRoles());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (RequireLoginException e) {
            ResponseResult<?> result = ResponseResult.error(HttpStatusCode.REQUIRE_LOGIN);
            responseUtils.renderString(response, JsonUtils.stringify(result));
            return;
        } catch (Exception e) {
            ResponseResult<?> result = ResponseResult.error(HttpStatusCode.TOKEN_INVALID);
            responseUtils.renderString(response, JsonUtils.stringify(result));
            return;
        }

        filterChain.doFilter(request, response);
    }
}
