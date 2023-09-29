package com.zach.blog.service;

public interface DbInitializationService {

    void populateRoles();

    void populateUsers();

    void populateArticles();

    void populateComments();

    void populateCategories();

    void populateOutboundLinks();
}
