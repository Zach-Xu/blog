package com.zach.blog.utils;

import java.util.Objects;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ValidationUtils {

    public String getErrorMessages(BindingResult bindingResult) {
        return bindingResult.getAllErrors()
                .stream()
                .map(ObjectError::getDefaultMessage)
                .reduce((msg1, msg2) -> String.format("%s, %s", msg1, msg2))
                .orElse("Invalid fields");
    }

    public boolean isImageValid(MultipartFile file) {

        if (Objects.isNull(file) || file.isEmpty()) {
            return false;
        }

        String originalFilename = file.getOriginalFilename();
        if (Objects.isNull(originalFilename) || originalFilename.isEmpty()) {
            return false;
        }

        String fileExtension = getFileExtension(originalFilename);
        if (Objects.isNull(fileExtension)) {
            return false;
        }

        // Check if the file extension is one of the allowed image formats.
        String[] validFileExtensions = { "jpg", "jpeg", "png" };
        for (String allowedExtension : validFileExtensions) {
            if (allowedExtension.equalsIgnoreCase(fileExtension)) {
                return true;
            }
        }

        return false;
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0) {
            return null; // No file extension found.
        }
        return filename.substring(dotIndex + 1).toLowerCase();
    }
}
