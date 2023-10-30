package com.zach.blog.exception;

import com.zach.blog.enums.code.HttpStatusCode;

public class UnsupportedFileTypeException extends BaseException {
    public UnsupportedFileTypeException() {
        super(HttpStatusCode.UNSUPPORTED_FILE_TYPE);
    }
}
