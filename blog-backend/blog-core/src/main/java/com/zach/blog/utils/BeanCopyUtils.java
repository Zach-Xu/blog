package com.zach.blog.utils;

import com.zach.blog.exception.FailedToCopyBeanException;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

public class BeanCopyUtils {

    private BeanCopyUtils() {

    }

    public static <T> T copyBean(Object source, Class<T> clazz) {
        Object target = null;

        try {
            target = clazz.getDeclaredConstructor().newInstance();
            BeanUtils.copyProperties(source, target);
        } catch (Exception e) {
            throw new FailedToCopyBeanException();
        }
        return (T) target;
    }

    public static <T> List<T> copyBeanList(List<?> source, Class<T> clazz) {
        return source.stream()
                .map(element -> copyBean(element, clazz))
                .collect(Collectors.toList());
    }

}