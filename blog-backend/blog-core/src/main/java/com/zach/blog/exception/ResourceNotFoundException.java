package com.zach.blog.exception;


import com.zach.blog.enums.code.ResourceNotFoundCode;

public class ResourceNotFoundException extends BaseException{

    public ResourceNotFoundException(ResourceNotFoundCode code) {
        super(code.getCode(), code.getMessage());
    }
}
