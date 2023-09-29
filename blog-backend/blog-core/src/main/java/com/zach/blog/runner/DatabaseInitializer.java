package com.zach.blog.runner;

import com.zach.blog.service.DbInitializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final DbInitializationService dbInitializationService;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        dbInitializationService.populateRoles();
        dbInitializationService.populateUsers();
        dbInitializationService.populateCategories();
        dbInitializationService.populateArticles();
    }
}
