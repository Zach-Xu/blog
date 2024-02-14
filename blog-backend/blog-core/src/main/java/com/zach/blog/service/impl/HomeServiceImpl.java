package com.zach.blog.service.impl;

import com.zach.blog.dto.response.AboutMeQueryResult;
import com.zach.blog.dto.response.OwnerCardInfoResponse;
import com.zach.blog.dto.response.SiteInfoQueryResult;
import com.zach.blog.dto.response.SiteInfoResponse;
import com.zach.blog.exception.ResourceNotFoundException;
import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.SiteInfo;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.repository.CategoryRepository;
import com.zach.blog.repository.SiteInfoRepository;
import com.zach.blog.repository.TagRepository;
import com.zach.blog.service.HomeService;
import com.zach.blog.utils.IPUtils;
import com.zach.blog.utils.RedisUtils;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.Objects;

import static com.zach.blog.constants.RedisKeyPrefix.SITE_VISIT_COUNT_KEY;
import static com.zach.blog.constants.RedisKeyPrefix.SITE_VISIT_IP_KEY;
import static com.zach.blog.enums.code.ResourceNotFoundCode.SITE_INFO_NOT_FOUND;

@RequiredArgsConstructor
@Service
public class HomeServiceImpl implements HomeService {

    private final SiteInfoRepository siteInfoRepository;
    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final RedisUtils redisUtils;
    private final IPUtils ipUtils;
    @Override
    public OwnerCardInfoResponse getOwnerCardInfo() {
        SiteInfo siteInfo = siteInfoRepository.findById(1L).orElseThrow(() -> new ResourceNotFoundException(SITE_INFO_NOT_FOUND));
        ApplicationUser owner = siteInfo.getOwner();

        OwnerCardInfoResponse ownerCardInfo = new OwnerCardInfoResponse();
        ownerCardInfo.setAvatar(owner.getAvatar());
        ownerCardInfo.setUsername(owner.getUsername());
        ownerCardInfo.setSocials(siteInfo.getSocials());
        ownerCardInfo.setArticleCount(articleRepository.count());
        ownerCardInfo.setCategoryCount(categoryRepository.count());
        ownerCardInfo.setTagCount(tagRepository.count());

        return ownerCardInfo;
    }

    @Override
    public SiteInfoResponse getSiteInfo() {
        SiteInfoQueryResult siteInfoQuery = siteInfoRepository.findSiteStats(1L).orElseThrow(() -> new ResourceNotFoundException(SITE_INFO_NOT_FOUND));
        SiteInfoResponse response = new SiteInfoResponse();
        response.setHostSince(siteInfoQuery.getHostSince());
        response.setArticleCount(articleRepository.count());

        Long siteVisitCountCache = redisUtils.get(SITE_VISIT_COUNT_KEY, Long.class);
        if(Objects.nonNull(siteVisitCountCache)){
            response.setVisitCount(siteVisitCountCache);
        }else{
            response.setVisitCount(siteInfoQuery.getVisitCount());
            redisUtils.set(SITE_VISIT_COUNT_KEY, siteInfoQuery.getVisitCount());
        }
        return response;
    }

    @Override
    public void updateSiteVisitCount() {
        String ipAddress = ipUtils.getIpAddress();
        String lastVisitedTime = redisUtils.getMapValue(SITE_VISIT_IP_KEY, ipAddress);
        long currentTime = System.currentTimeMillis();
        // user has visited the site before
        if(Strings.hasText(lastVisitedTime)){
            // it has been more than 1 hour since the last time the user with this ip visited the site
            if( currentTime - Long.parseLong(lastVisitedTime) > 1000 * 60 *60){
                redisUtils.increase(SITE_VISIT_COUNT_KEY, 1);
            }
        }else{
            // user with this ip visit the site for the first time
            redisUtils.increase(SITE_VISIT_COUNT_KEY, 1);
        }

        // update the last visited time
        redisUtils.setMapValue(SITE_VISIT_IP_KEY, ipAddress, String.valueOf(currentTime));
    }

    @Override
    public AboutMeQueryResult getAboutMe() {
       return siteInfoRepository.findAboutMe(1L).orElseThrow(() -> new ResourceNotFoundException(SITE_INFO_NOT_FOUND));
    }
}
