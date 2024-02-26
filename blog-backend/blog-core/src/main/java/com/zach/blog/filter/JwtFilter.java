package com.zach.blog.filter;


import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.enums.code.HttpStatusCode;
import com.zach.blog.exception.AuthException;
import com.zach.blog.model.SessionUser;
import com.zach.blog.utils.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;
import static com.zach.blog.enums.code.AuthErrorCode.INVALID_TOKEN;
import static com.zach.blog.enums.code.AuthErrorCode.REQUIRE_LOGIN;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    @Value("${zach.blog.jwt.name}")
    private String jwtName;

    private final JwtUtils jwtUtils;
    private final ResponseUtils responseUtils;
    private final RedisUtils redisUtils;
    private final CookieUtils cookieUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        if(Objects.isNull(cookies)){
            filterChain.doFilter(request, response);
            return;
        }

        Optional<String> jwtOpt = Arrays.stream(cookies).filter(c -> c.getName().equals(jwtName))
                .map(Cookie::getValue).findAny();

        if(jwtOpt.isEmpty()){
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = jwtOpt.get();

        try {
            if (jwtUtils.validateJwtToken(jwt)) {
                Long userId = jwtUtils.extractUserId(jwt);

                SessionUser sessionUser = redisUtils.get(USER_KEY + userId, SessionUser.class);

                // User is authenticated if no exception thrown
                if (Objects.isNull(sessionUser)) {
                    throw new AuthException(REQUIRE_LOGIN);
                }

                List<SimpleGrantedAuthority> authorities = sessionUser.getPermissions().stream()
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(sessionUser, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }else{
                throw new AuthException(INVALID_TOKEN);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            logger.error(e.getMessage());
            ResponseResult<?> result = ResponseResult.error(HttpStatusCode.INVALID_TOKEN);
            ResponseCookie cookie = cookieUtils.destroyJwtCookie();
            response.setHeader(HttpHeaders.SET_COOKIE,  cookie.toString());
            responseUtils.renderString(response, JsonUtils.stringify(result));
            return;
        }

//        String authorizationHeader = request.getHeader("Authorization");
//
//        if (Strings.isEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String jwt = authorizationHeader.substring(7);
//
//        try {
//            if (jwtUtils.validateJwtToken(jwt)) {
//                Long userId = jwtUtils.extractUserId(jwt);
//
//                SessionUser sessionUser = redisUtils.get(USER_KEY + userId, SessionUser.class);
//
//                // User is authenticated if no exception thrown
//                if (Objects.isNull(sessionUser)) {
//                    throw new RequireLoginException();
//                }
//
//                List<SimpleGrantedAuthority> authorities = sessionUser.getPermissions().stream()
//                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
//
//                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(sessionUser, null, authorities);
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }else{
//                throw new RuntimeException("Invalid token");
//            }
//        } catch (RequireLoginException e) {
//            ResponseResult<?> result = ResponseResult.error(HttpStatusCode.REQUIRE_LOGIN);
//            responseUtils.renderString(response, JsonUtils.stringify(result));
//            return;
//        } catch (Exception e) {
//            ResponseResult<?> result = ResponseResult.error(HttpStatusCode.TOKEN_INVALID);
//            responseUtils.renderString(response, JsonUtils.stringify(result));
//            return;
//        }

        filterChain.doFilter(request, response);
    }
}
