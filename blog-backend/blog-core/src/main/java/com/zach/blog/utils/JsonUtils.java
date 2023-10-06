package com.zach.blog.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.util.Strings;

import java.io.IOException;

public class JsonUtils {
    private static ObjectMapper objectMapper = new ObjectMapper();

    public static <T> String stringify(T obj) {
        if (obj == null) {
            return null;
        }
        try {
            return obj instanceof String ? (String) obj : objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static <T> T parse(String str, Class<T> type) {
        if (Strings.isEmpty(str) || type == null) {
            return null;
        }
        try {
            return type.equals(String.class) ? (T) str : objectMapper.readValue(str, type);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
