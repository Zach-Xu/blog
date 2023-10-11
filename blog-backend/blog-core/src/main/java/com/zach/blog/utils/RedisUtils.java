package com.zach.blog.utils;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;
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


    public void setMap(String key, Map<String, String> map) {
        if (Objects.nonNull(map)) {
            stringRedisTemplate.opsForHash().putAll(key, map);
        }
    }

    public void setMapValue(String key, String hKey, String hValue) {
        stringRedisTemplate.opsForHash().put(key, hKey, hValue);
    }

    public void increaseMapValue(String key, String hKey, int value){
        stringRedisTemplate.opsForHash().increment(key, hKey, value);
    }

    public Map<?, ?> getMap(String key){
        return stringRedisTemplate.opsForHash().entries(key);
    }

    public String getMapValue(String key, String hKey) {
        return (String) stringRedisTemplate.opsForHash().get(key, hKey);
    }

    public boolean delete(String key) {
        return stringRedisTemplate.delete(key);
    }


}
