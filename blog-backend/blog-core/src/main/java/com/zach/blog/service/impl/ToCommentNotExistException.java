package com.zach.blog.service.impl;

public class ToCommentNotExistException extends RuntimeException {
    public ToCommentNotExistException() {
        super("The comment you try to reply does not exist.");
    }
}
