package com.zach.blog.service;

import com.zach.blog.dto.response.OwnerCardInfoResponse;
import com.zach.blog.dto.response.SiteInfoResponse;

public interface HomeService {
    OwnerCardInfoResponse getOwnerCardInfo();

    SiteInfoResponse getSiteInfo();

    void updateSiteVisitCount();
}
