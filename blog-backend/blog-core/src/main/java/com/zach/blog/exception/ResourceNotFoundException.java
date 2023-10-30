package com.zach.blog.exception;

import com.zach.blog.enums.code.HttpStatusCode;

public class ResourceNotFoundException extends BaseException{

    public ResourceNotFoundException(HttpStatusCode code) {
        super(code);
    }
}
