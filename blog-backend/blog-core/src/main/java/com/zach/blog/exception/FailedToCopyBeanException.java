package com.zach.blog.exception;

public class FailedToCopyBeanException extends RuntimeException {

    public FailedToCopyBeanException() {
        super("Failed to copy bean.");
    }
}
