package com.zach.blog.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.zach.blog.enums.HttpStatusCode;
import com.zach.blog.exception.IllegalHttpStatusCodeException;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseResult<T> implements Serializable {

    private Integer code;
    private String message;
    private T data;

    private ResponseResult(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    private ResponseResult(Integer code, String message, T data) {
        this(code, message);
        this.data = data;
    }

    public static ResponseResult<?> error(HttpStatusCode code) {
        if (code == HttpStatusCode.SUCCESS) throw new IllegalHttpStatusCodeException(code);
        return build(code);
    }

    public static ResponseResult<?> error(String message){
        return build(HttpStatusCode.BAD_REQUEST.getCode() ,message);
    }


    public static ResponseResult<?> error(HttpStatusCode code, String message) {
        if (code == HttpStatusCode.SUCCESS) throw new IllegalHttpStatusCodeException(code);
        return build(code.getCode(), message);
    }

    public static ResponseResult<?> ok() {
        return build(HttpStatusCode.SUCCESS);
    }

    public static <T> ResponseResult<T> ok(T data) {
        return build(HttpStatusCode.SUCCESS.getCode(), HttpStatusCode.SUCCESS.getMessage(), data);
    }

    private static ResponseResult<?> build(HttpStatusCode code) {
        return build(code.getCode(), code.getMessage());
    }

    private static ResponseResult<?> build(int code, String message) {
        return new ResponseResult<>(code, message);
    }

    private static <T> ResponseResult<T> build(int code, String message, T data) {
        return new ResponseResult<>(code, message, data);
    }

}
