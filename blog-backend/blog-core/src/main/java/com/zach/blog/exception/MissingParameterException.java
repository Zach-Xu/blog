package com.zach.blog.exception;

public class MissingParameterException extends RuntimeException {
    public MissingParameterException(String message) {
        super(message);
    }
}
