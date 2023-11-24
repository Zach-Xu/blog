package com.zach.blog.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.StoredFile;
import com.cloudinary.utils.ObjectUtils;
import com.zach.blog.exception.MissingParameterException;
import com.zach.blog.exception.UnsupportedFileTypeException;

import com.zach.blog.service.FileService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static com.zach.blog.constants.RedisKeyPrefix.USER_KEY;

@Service
@RequiredArgsConstructor
public class CloudinaryFileService implements FileService {
    private final Cloudinary cloudinary;
    private static final String URL_PREFIX = "https://res.cloudinary.com/";
    private static final Set<String> allowedFileTypes = new HashSet<>(Arrays.asList(".png",".jpg",".jpeg"));

    @Value("${zach.blog.cloudinary.name}")
    private String cloudName;

    @Override
    public String UploadFile(MultipartFile file) throws IOException {

        if (Objects.isNull(file) || Objects.isNull(file.getOriginalFilename())) {
            throw new MissingParameterException("Image file is required");
        }

        if (allowedFileTypes.stream().noneMatch(extension -> file.getOriginalFilename().endsWith(extension))) {
            throw new UnsupportedFileTypeException();
        }

        // Upload image to Cloudinary
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto"));
        StoredFile storedFile = new StoredFile();
        storedFile.setPublicId((String) uploadResult.get("public_id"));
        Object version = uploadResult.get("version");
        if (version instanceof Integer) {
            storedFile.setVersion(((Integer) version).longValue());
        } else {
            storedFile.setVersion((Long) version);
        }

        storedFile.setSignature((String) uploadResult.get("signature"));
        storedFile.setFormat((String) uploadResult.get("format"));
        storedFile.setResourceType((String) uploadResult.get("resource_type"));

        // Generate image url based on the upload result
        String avatar = URL_PREFIX + this.cloudName + "/" + storedFile.getPreloadedFile();
        return avatar;
    }
}
