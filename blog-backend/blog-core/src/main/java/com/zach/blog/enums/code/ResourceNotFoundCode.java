package com.zach.blog.enums.code;

public enum ResourceNotFoundCode {

    TAG_NOT_FOUND("Tag does not exist"),
    USER_NOT_FOUND("User does not exist"),
    ARTICLE_NOT_FOUND("Article does not exist"),
    CATEGORY_NOT_FOUND("Category does not exist"),
    ROLE_NOT_FOUND("Role does not exist"),
    MENU_NOT_FOUND("Menu does not exist");

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
