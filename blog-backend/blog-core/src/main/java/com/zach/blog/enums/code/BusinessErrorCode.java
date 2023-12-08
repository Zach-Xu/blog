package com.zach.blog.enums.code;

public enum BusinessErrorCode {

    INVALID_MENU_PARENT_ID("Menu can not be its own parent"),
    SUB_MENUS_EXIST("The menu about to delete should not have any sub menus");
    final int code = 400;
    final String message;

    BusinessErrorCode(String errorMessage){
        this.message = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
