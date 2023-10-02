package com.zach.blog.exception;

public class ArticleNotExistException extends RuntimeException{

    public ArticleNotExistException() {
        super("Article does not exist");
    }
}
