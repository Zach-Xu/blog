package com.zach.blog.exception;

public class RequireLoginException extends RuntimeException{
    public RequireLoginException() {
        super("Please login first.");
    }
}
