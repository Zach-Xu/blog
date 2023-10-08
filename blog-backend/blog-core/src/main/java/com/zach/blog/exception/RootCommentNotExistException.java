package com.zach.blog.exception;

public class RootCommentNotExistException extends RuntimeException {
    public RootCommentNotExistException() {
        super("Root comment does not exist.");
    }
}
