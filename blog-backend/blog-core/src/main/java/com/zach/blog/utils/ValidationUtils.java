package com.zach.blog.utils;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

@Component
public class ValidationUtils {

    public String getErrorMessages(BindingResult bindingResult){
        return bindingResult.getAllErrors()
                .stream()
                .map(ObjectError::getDefaultMessage)
                .reduce((msg1, msg2) -> String.format("%s, %s", msg1, msg2))
                .orElse("Invalid fields");
    }
}
