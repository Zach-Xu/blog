package com.zach.blog.exception;

public class UsernameAlreadyTakenException extends RuntimeException{

    public UsernameAlreadyTakenException() {
        super("Username is already taken");
    }
}
