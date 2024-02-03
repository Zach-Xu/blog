package com.zach.blog.enums.code;

public enum ResourceNotFoundCode {
    LINK_NOT_FOUND("Link does not exist"),
    TO_COMMENT_NOT_FOUND("The comment you try to reply does not exist."),
    ROOT_COMMENT_NOT_FOUND("Root comment does not exist"),
    TAG_NOT_FOUND("Tag does not exist"),
    USER_NOT_FOUND("User does not exist"),
    ARTICLE_NOT_FOUND("Article does not exist"),
    CATEGORY_NOT_FOUND("Category does not exist"),
    ROLE_NOT_FOUND("Role does not exist"),
    MENU_NOT_FOUND("Menu does not exist"),

    SITE_INFO_NOT_FOUND("Site information does not exist, please contact admin asap");

    final int code = 404;
    final String message;

    ResourceNotFoundCode(String errorMessage) {
        this.message = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
