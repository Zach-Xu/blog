package com.zach.blog.enums.code;

public enum AuthErrorCode {

    UNAUTHENTICATED(401, "Invalid credentials"),
    REQUIRE_LOGIN(401, "Action required login"),
    LOGIN_ERROR(401, "Invalid credentials"),
    INVALID_TOKEN(401, "Invalid or expired token"),
    UNAUTHORIZED(403, "No permission to perform this action");
    final int code;
    final String message;

    AuthErrorCode(int code, String errorMessage){
        this.code = code;
        this.message = errorMessage;
    }

    public int getCode(){
        return code;
    }

    public String getMessage() {
        return message;
    }
}
