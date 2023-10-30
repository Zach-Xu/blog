package com.zach.blog.exception;

import com.zach.blog.enums.code.HttpStatusCode;

public class IllegalHttpStatusCodeException extends RuntimeException {
    public IllegalHttpStatusCodeException(HttpStatusCode code) {
        super("HttpStatusCode." + code.name() + " is not allowed.");
    }
}
