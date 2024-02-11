package com.zach.blog.enums.code;

public enum HttpStatusCode {

    SUCCESS(200, "Action successful"),
    BAD_REQUEST(400, "Bad request"),
    MISSING_PARAMETER(400, "Query missing required parameters"),
    INVALID_PARAMETER(400, "Invalid parameters"),
    REQUIRE_LOGIN(401, "Action required login"),
    SYSTEM_ERROR(500, "Internal server error, please contact admin"),
    LOGIN_ERROR(401, "Invalid credentials"),
    RESOURCE_NOT_FOUND(404, "Resource does not exist"),
    FORBIDDEN(403, "No permission to perform this action"),
    INVALID_TOKEN(401, "Invalid or expired token");

    final int code;
    final String message;

    HttpStatusCode(int code, String errorMessage) {
        this.code = code;
        this.message = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
