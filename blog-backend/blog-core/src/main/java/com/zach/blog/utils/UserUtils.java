package com.zach.blog.utils;

import com.zach.blog.model.ApplicationUser;
import com.zach.blog.model.Menu;
import com.zach.blog.model.Role;
import com.zach.blog.model.SessionUser;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserUtils {

//    public SessionUser convertUserToSessionUser(ApplicationUser user){
//        SessionUser sessionUser = BeanCopyUtils.copyBean(user, SessionUser.class);
//        sessionUser.setRoleName(user.getRoles().stream().findFirst().map(Role::getRoleName).orElse("Regular User"));
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        sessionUser.setPermissions(authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority).
//                filter(permission -> Strings.isNotBlank(permission)
//                ).collect(Collectors.toList())
//        );
//        return sessionUser;
//    }


    public SessionUser convertUserToSessionUser(ApplicationUser user){
        SessionUser sessionUser = BeanCopyUtils.copyBean(user, SessionUser.class);
        sessionUser.setRoleName(user.getRoles().stream().findFirst().map(Role::getRoleName).orElse("Regular User"));

        Set<Menu> menus = user.getRoles().stream().flatMap(role -> role.getMenus().stream()).collect(Collectors.toSet());
        List<String> permissions = menus.stream().map(Menu::getPermission).filter(Strings::isNotBlank).collect(Collectors.toList());
        sessionUser.setPermissions(permissions);

        return sessionUser;
    }
}
