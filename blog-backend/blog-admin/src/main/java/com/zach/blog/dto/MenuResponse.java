package com.zach.blog.dto;

import com.zach.blog.model.Menu;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenuResponse {
    private Menu menu;
    private List<Menu> subMenus;
}
