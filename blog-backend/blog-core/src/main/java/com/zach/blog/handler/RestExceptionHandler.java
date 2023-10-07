package com.zach.blog.handler;

import com.zach.blog.dto.ResponseResult;
import com.zach.blog.enums.HttpStatusCode;
import com.zach.blog.exception.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler({ArticleNotExistException.class, CategoryNotExistException.class, UserNotExistException.class})
    public ResponseResult<?> resourceNotFoundException(RuntimeException e) {
        return ResponseResult.error(HttpStatusCode.RESOURCE_NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler({FailedToCopyBeanException.class, IllegalHttpStatusCodeException.class})
    public ResponseResult<?> internalServerException(RuntimeException e) {
        e.printStackTrace();
        return ResponseResult.error(HttpStatusCode.SYSTEM_ERROR);
    }

    @ExceptionHandler({MissingServletRequestParameterException.class})
    public ResponseResult<?> illegalParameterException(Exception e){
        e.printStackTrace();
        return ResponseResult.error(HttpStatusCode.MISSING_PARAMETER);
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
