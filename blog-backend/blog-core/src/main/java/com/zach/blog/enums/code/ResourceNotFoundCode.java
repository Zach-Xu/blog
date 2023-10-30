package com.zach.blog.enums.code;

public enum ResourceNotFoundCode {

    TAG_NOT_FOUND("Tag does not exist");

    final int code = 404;
    final String message;

    ResourceNotFoundCode( String errorMessage) {
        this.message = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
