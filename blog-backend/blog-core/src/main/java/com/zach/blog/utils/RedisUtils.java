package com.zach.blog.utils;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtils {
    private final StringRedisTemplate stringRedisTemplate;

    public void set(String key, Object value) {
        if (value instanceof String) {
            set(key, value);
        } else {
            set(key, JsonUtils.stringify(value));
        }
    }

    public void set(String key, Object value, Long time, TimeUnit unit) {
        if (value instanceof String) {
            set(key, value, time, unit);
        } else {
            set(key, JsonUtils.stringify(value), time, unit);
        }
    }

    public void set(String key, String value) {
        stringRedisTemplate.opsForValue().set(key, value);
    }

    public void set(String key, String value, Long time, TimeUnit unit) {
        stringRedisTemplate.opsForValue().set(key, value, time, unit);
    }

    public <T> T get(String key, Class<T> type) {

        String value = stringRedisTemplate.opsForValue().get(key);
        if (Strings.isEmpty(value)) {
            return null;
        }
        return JsonUtils.parse(value, type);

    }


}
