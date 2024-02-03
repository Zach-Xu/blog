package com.zach.blog.job;

import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.SiteInfo;
import com.zach.blog.repository.SiteInfoRepository;
import com.zach.blog.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static com.zach.blog.constants.RedisKeyPrefix.SITE_VISIT_COUNT_KEY;
import static com.zach.blog.constants.RedisKeyPrefix.SITE_VISIT_IP_KEY;
import static com.zach.blog.enums.code.ResourceNotFoundCode.SITE_INFO_NOT_FOUND;


@Component
@RequiredArgsConstructor
@Slf4j
public class UpdateSiteVisitCountJob {

    private final RedisUtils redisUtils;
    private final SiteInfoRepository siteInfoRepository;

    @Scheduled(cron = "0 30 0/8 * * ?")
    @Transactional
    public void updateVisitCount() {
        log.info("Scheduled tasks starting .....");

        Long siteVisitCountCache = redisUtils.get(SITE_VISIT_COUNT_KEY, Long.class);
        SiteInfo siteInfo = siteInfoRepository.findById(1L).orElseThrow(() -> new ResourceNotFoundException(SITE_INFO_NOT_FOUND));
        siteInfo.setVisitCount(siteVisitCountCache);
        siteInfoRepository.save(siteInfo);
        log.info("Scheduled tasks ending .....");
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void clearExpiredIp(){
        log.info("Scheduled tasks starting .....");
        Map<?, ?> visitedIPMap = redisUtils.getMap(SITE_VISIT_IP_KEY);
        long currentTime = System.currentTimeMillis();
        for (Map.Entry<?, ?> entry : visitedIPMap.entrySet()) {
            String ipAddress = (String)entry.getKey();
            long lastVisitedTime = Long.parseLong((String)entry.getValue());
            if(currentTime - lastVisitedTime > 1000 * 60 * 60){
                redisUtils.deleteMapKey(SITE_VISIT_COUNT_KEY, ipAddress);
            }
        }
        log.info("Scheduled tasks ending .....");
    }
}
