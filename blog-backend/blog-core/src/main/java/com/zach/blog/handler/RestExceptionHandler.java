package com.zach.blog.handler;

import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.enums.code.HttpStatusCode;
import com.zach.blog.exception.*;
import com.zach.blog.service.impl.ToCommentNotExistException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;


@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler({ArticleNotExistException.class, CategoryNotExistException.class, UserNotExistException.class, RootCommentNotExistException.class, ToCommentNotExistException.class})
    public ResponseResult<?> resourceNotFoundException(RuntimeException e) {
        return ResponseResult.error(HttpStatusCode.RESOURCE_NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler({ResourceAlreadyExistException.class})
    public ResponseResult<?> resourceAlreadyExistException(ResourceAlreadyExistException e) {
        return ResponseResult.error(e.getCode(), e.getMessage());
    }

    @ExceptionHandler({FailedToCopyBeanException.class, IllegalHttpStatusCodeException.class, SQLIntegrityConstraintViolationException.class, IllegalArgumentException.class})
    public ResponseResult<?> internalServerException(RuntimeException e) {
        e.printStackTrace();
        return ResponseResult.error(HttpStatusCode.SYSTEM_ERROR);
    }

    @ExceptionHandler({MissingServletRequestParameterException.class, MissingParameterException.class})
    public ResponseResult<?> missingParameterException(Exception e){
        e.printStackTrace();
        return ResponseResult.error(HttpStatusCode.MISSING_PARAMETER, e.getMessage());
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    public ResponseResult<?> illegalParameterException(Exception e){
        e.printStackTrace();
        return ResponseResult.error(HttpStatusCode.INVALID_PARAMETER);
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseResult<?> authenticationException(RuntimeException e) {
        return ResponseResult.error(HttpStatusCode.LOGIN_ERROR, e.getMessage());
    }

    @ExceptionHandler({UsernameAlreadyTakenException.class})
    public ResponseResult<?> userNameTakenException(RuntimeException e) {
        return ResponseResult.error(e.getMessage());
    }


}
