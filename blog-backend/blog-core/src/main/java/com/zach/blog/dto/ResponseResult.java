package com.zach.blog.dto;

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

    public ResponseResult() {
        this.code = HttpStatusCode.SUCCESS.getCode();
        this.message = HttpStatusCode.SUCCESS.getMessage();
    }

    public ResponseResult(Integer code, T data) {
        this.code = code;
        this.data = data;
    }

    public ResponseResult(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResponseResult(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static ResponseResult error(HttpStatusCode code){
        if(code == HttpStatusCode.SUCCESS) throw new IllegalHttpStatusCodeException(code);
        return build(code);
    }

    private static ResponseResult build(HttpStatusCode code){
        return new ResponseResult(code.getCode(), code.getMessage());
    }

    public static ResponseResult ok(){
        return build(HttpStatusCode.SUCCESS);
    }

    public static ResponseResult<?> ok(Object data){
        ResponseResult result = build(HttpStatusCode.SUCCESS);
        result.setData(data);
        return result;
    }
}
