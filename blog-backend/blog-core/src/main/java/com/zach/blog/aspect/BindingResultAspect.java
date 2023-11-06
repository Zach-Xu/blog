package com.zach.blog.aspect;

import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.utils.ValidationUtils;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Component
@Aspect
@RequiredArgsConstructor
public class BindingResultAspect {

    private final ValidationUtils validationUtils;

    @Pointcut("@annotation(com.zach.blog.annotation.Validate)")
    public void pointCut() {

    }

    @Around("pointCut()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {

        Object[] objs = joinPoint.getArgs();
        List<Object> listObj = Arrays.stream(objs).toList();

        // get BeanPropertyBindingResult(bindingResult) from joinPoint
        BeanPropertyBindingResult optional = (BeanPropertyBindingResult) listObj.stream()
                .filter(p -> "BeanPropertyBindingResult".equals(p.getClass().getSimpleName()))
                .findFirst()
                .orElse(null);

        Object result;

        if (Objects.nonNull(optional) && optional.hasErrors()) {
            String errorMessages = validationUtils.getErrorMessages(optional);
            result = ResponseResult.error(errorMessages);
        } else {
            result = joinPoint.proceed();
        }
        return result;
    }

}
