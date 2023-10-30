package com.zach.blog.exception;

import com.zach.blog.enums.code.ResourceAlreadyExistCode;

public class ResourceAlreadyExistException extends BaseException{

    public ResourceAlreadyExistException(ResourceAlreadyExistCode code) {
        super(code.getCode(), code.getMessage());
    }
}
