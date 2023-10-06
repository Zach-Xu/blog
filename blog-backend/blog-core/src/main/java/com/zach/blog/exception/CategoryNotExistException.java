package com.zach.blog.exception;

public class CategoryNotExistException extends RuntimeException{

    public CategoryNotExistException() {
        super("Such category does not exist yet.");
    }
}
