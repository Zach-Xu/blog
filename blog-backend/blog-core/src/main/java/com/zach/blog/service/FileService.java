package com.zach.blog.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    void UploadFile(Long userId, MultipartFile file) throws IOException;
}
