package com.zach.blog.exception;

public class TokenInvalidException extends RuntimeException{
    public TokenInvalidException() {
        super("Token is invalid or expired.");
    }
}
