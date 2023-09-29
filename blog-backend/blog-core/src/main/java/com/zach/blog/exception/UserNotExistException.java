package com.zach.blog.exception;

public class UserNotExistException extends RuntimeException {
    public UserNotExistException() {
        super("Such user does not exist");
    }
}
