package com.zach.blog.enums.code;

public enum ResourceAlreadyExistCode {
    EMAIL_EXIST("Email is already taken"),
    USER_NAME_EXIST("Username is already taken"),
    TAG_NAME_EXIST("Tag name already exist"),
    CATEGORY_NAME_EXIST("Category name already exist"),
    MENU_NAME_EXIST("Menu name already exist");

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
