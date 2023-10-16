package com.zach.blog.utils;

import com.zach.blog.exception.FailedToCopyBeanException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.List;

import java.util.Set;
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

    public static <T> T copyBean(Object source, Class<T> clazz, String... ignoreProperties) {
        T target;

        try {
            target = clazz.getDeclaredConstructor().newInstance();
            BeanUtils.copyProperties(source, target, ignoreProperties);
        } catch (Exception e) {
            throw new FailedToCopyBeanException();
        }
        return target;
    }

    public static void copyPropertiesIgnoreNull(Object src, Object target) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    private static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
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