package com.zach.blog.enums;

public enum RoleName {

    ADMIN("Admin"),
    USER("Regular user"),
    LINK_AUDITOR("Link auditor"),
    VIEWER("Viewer");
    final String name;
    RoleName(String name) {
        this.name = name;
    }

    String getName(){
        return this.name;
    }
}
