package com.zach.blog.exception;

import com.zach.blog.enums.code.BusinessErrorCode;

public class BusinessException extends BaseException{

    public BusinessException(BusinessErrorCode code) {
        super(code.getCode(), code.getMessage() );
    }

}
