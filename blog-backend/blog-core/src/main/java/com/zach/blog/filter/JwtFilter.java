package com.zach.blog.filter;


import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.enums.code.HttpStatusCode;
import com.zach.blog.exception.RequireLoginException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.SessionUser;
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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

        if (Strings.isEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authorizationHeader.substring(7);

        try {
            if (jwtUtils.validateJwtToken(jwt)) {
                Long userId = jwtUtils.extractUserId(jwt);

                SessionUser sessionUser = redisUtils.get(USER_KEY + userId, SessionUser.class);

                // User is authenticated if no exception thrown
                if (Objects.isNull(sessionUser)) {
                    throw new RequireLoginException();
                }

                List<SimpleGrantedAuthority> authorities = sessionUser.getPermissions().stream()
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(sessionUser, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }else{
                throw new RuntimeException("Invalid token");
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
