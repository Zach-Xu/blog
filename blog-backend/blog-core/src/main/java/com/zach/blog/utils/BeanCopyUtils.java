package com.zach.blog.utils;

import com.zach.blog.exception.FailedToCopyBeanException;
import org.springframework.beans.BeanUtils;

import java.util.List;

import java.util.stream.Collectors;

public class BeanCopyUtils {

    private BeanCopyUtils() {

    }

    public static <T> T copyBean(Object source, Class<T> clazz) {
        T target;

        try {
            target = clazz.getDeclaredConstructor().newInstance();
            BeanUtils.copyProperties(source, target);
        } catch (Exception e) {
            throw new FailedToCopyBeanException();
        }
        return target;
    }

    public static <T> T copyBeanWithAssociationPropertyAsField(Object source, Class<T> type) {
        T target;

        try {
            target = type.getDeclaredConstructor(source.getClass()).newInstance(source);
            BeanUtils.copyProperties(source, target);
        } catch (Exception e) {
            throw new FailedToCopyBeanException();
        }
        return target;
    }

    public static <T> List<T> copyBeanList(List<?> source, Class<T> type) {
        return source.stream()
                .map(element -> copyBean(element, type))
                .collect(Collectors.toList());
    }

    public static <T> List<T> copyBeanListWithAssociationPropertyAsField(List<?> source, Class<T> type) {
        return source.stream()
                .map(element -> copyBeanWithAssociationPropertyAsField(element, type))
                .collect(Collectors.toList());
    }

}