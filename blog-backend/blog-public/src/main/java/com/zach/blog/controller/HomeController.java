package com.zach.blog.controller;

import com.zach.blog.dto.response.AboutMeQueryResult;
import com.zach.blog.dto.response.OwnerCardInfoResponse;
import com.zach.blog.dto.response.ResponseResult;
import com.zach.blog.dto.response.SiteInfoResponse;
import com.zach.blog.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping("/owner-card")
    public ResponseResult<?> getOwnerCardInfo(){
        OwnerCardInfoResponse response = homeService.getOwnerCardInfo();
        return ResponseResult.ok(response);
    }

    @GetMapping("/site")
    public ResponseResult<?> getSiteInfo(){
        SiteInfoResponse response = homeService.getSiteInfo();
        return ResponseResult.ok(response);
    }

    @PostMapping("/site/visit-count")
    public ResponseResult<?> updateSiteVisitCount(){
        homeService.updateSiteVisitCount();
        return ResponseResult.ok();
    }

    @GetMapping("/about")
    public ResponseResult<?> getAboutMe(){
        AboutMeQueryResult response = homeService.getAboutMe();
        return ResponseResult.ok(response);
    }
}
