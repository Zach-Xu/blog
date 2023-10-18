package com.zach.blog.dto.response;

import com.zach.blog.enums.MenuType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenuTreeViewResponse {
    private Long id;
    private Long parentId;
    private Integer displayOrder;
    private String name;
    private List<MenuTreeViewResponse> subMenus;
}
