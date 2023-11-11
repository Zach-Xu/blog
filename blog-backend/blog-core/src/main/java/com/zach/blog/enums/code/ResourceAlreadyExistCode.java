package com.zach.blog.enums.code;

public enum ResourceAlreadyExistCode {

    TAG_NAME_EXIST("Tag name already exist"),
    CATEGORY_NAME_EXIST("Category name already exist");
    final int code = 400;
    final String message;

    ResourceAlreadyExistCode( String errorMessage) {
        this.message = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
