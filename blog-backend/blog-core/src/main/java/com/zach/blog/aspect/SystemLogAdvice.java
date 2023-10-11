package com.zach.blog.aspect;

import com.zach.blog.annotation.SystemLog;
import com.zach.blog.utils.JsonUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;


@Component
@Aspect
@Slf4j
@RequiredArgsConstructor
public class SystemLogAdvice {

    private final HttpServletRequest request;

    @Pointcut("@annotation(com.zach.blog.annotation.SystemLog)")
    public void pointCut() {

    }

    @Around("pointCut()")
    public Object printLog(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result;

        try {
            proceedBefore(joinPoint);
            result = joinPoint.proceed();
            proceedAfter(result);
        } finally {
            log.info("=======End=======" + System.lineSeparator());
        }

        return result;
    }

    private void proceedBefore(ProceedingJoinPoint joinPoint) {
        log.info("=======Start=======");
        log.info("URL            : {}", request.getPathInfo());
        log.info("BusinessName   : {}", getAnnotation(joinPoint).businessName());
        log.info("HTTP Method    : {}", request.getMethod());
        log.info("Class Method   : {}.{}", joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());
        log.info("IP             : {}", request.getRemoteHost());
//        log.info("Request Args   : {}", JsonUtils.stringify(joinPoint.getArgs()));
    }

    private void proceedAfter(Object result) {
        log.info("Response       : {}", JsonUtils.stringify(result));
    }

    private SystemLog getAnnotation(ProceedingJoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod().getAnnotation(SystemLog.class);
    }

}
