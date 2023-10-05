package com.zach.blog.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zach.blog.dto.ResponseResult;
import com.zach.blog.enums.HttpStatusCode;
import com.zach.blog.exception.UserNotExistException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.utils.JwtUtils;
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
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final ApplicationUserRepository userRepository;
    private final ResponseUtils responseUtils;


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
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                // Todo: query user from redis
                Optional<ApplicationUser> userOpt = userRepository.findByUsername(username);

                // user is authenticated if no exception thrown
                UsernamePasswordAuthenticationToken authentication = userOpt.map(u -> new UsernamePasswordAuthenticationToken(u, null, u.getAuthorities()))
                        .orElseThrow(UserNotExistException::new);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            responseUtils.renderString(response, new ObjectMapper().writeValueAsString(ResponseResult.error(HttpStatusCode.TOKEN_INVALID)));
            return;
        }

        filterChain.doFilter(request, response);
    }
}
