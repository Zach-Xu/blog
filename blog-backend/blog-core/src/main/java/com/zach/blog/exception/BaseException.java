package com.zach.blog.exception;

import com.zach.blog.enums.HttpStatusCode;

public abstract class BaseException extends RuntimeException {

    // ToDo: refactor custom exceptions and handlers
    private int code;

    public BaseException(HttpStatusCode code) {
        super(code.getMessage());
        this.code = code.getCode();
    }
}
