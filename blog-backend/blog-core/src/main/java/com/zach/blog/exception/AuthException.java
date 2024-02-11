package com.zach.blog.exception;

import com.zach.blog.enums.code.AuthErrorCode;

public class AuthException extends BaseException{
    public AuthException(AuthErrorCode code) {
        super(code.getCode(), code.getMessage());
    }

}
