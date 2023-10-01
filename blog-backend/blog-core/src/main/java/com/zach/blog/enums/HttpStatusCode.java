package com.zach.blog.enums;

public enum HttpStatusCode {

    SUCCESS(200, "Action successful"),
    REQUIRE_LOGIN(401, "Action required login"),
    SYSTEM_ERROR(500, "Internal server error, please contact admin"),
    LOGIN_ERROR(401, "Invalid credentials"),
    RESOURCE_NOT_FOUND(404, "Resource is not existed"),
    FORBIDDEN(403, "Not allowed to perform this action");


    final int code;
    final String message;

    HttpStatusCode(int code, String errorMessage) {
        this.code = code;
        this.message = errorMessage;
    }

    public int getCode(){
        return code;
    }

    public String getMessage(){
        return message;
    }
}
