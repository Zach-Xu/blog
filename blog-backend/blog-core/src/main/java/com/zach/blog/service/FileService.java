package com.zach.blog.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String UploadFile(MultipartFile file) throws IOException;
}
