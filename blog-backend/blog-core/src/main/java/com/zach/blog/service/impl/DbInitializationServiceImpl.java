package com.zach.blog.service.impl;

import com.zach.blog.enums.*;
import com.zach.blog.model.*;

import com.zach.blog.repository.*;
import com.zach.blog.service.DbInitializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.zach.blog.constants.MenuName.*;

@Service
@RequiredArgsConstructor
@Transactional
public class DbInitializationServiceImpl implements DbInitializationService {
    private final PasswordEncoder passwordEncoder;
    private final CommentRepository commentRepository;
    private final ApplicationUserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final MenuRepository menuRepository;
    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final OutboundLinkRepository linkRepository;
    private final TagRepository tagRepository;

    @Override
    public void populateRoles() {
        if (roleRepository.count() > 0) {
            return;
        }

        Role adminRole = new Role(RoleName.ROLE_ADMIN);
        adminRole.setDisplayOrder(1);
        adminRole.addMenu(menuRepository.findByName(SYSTEM_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(CATEGORY_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(ROLE_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(LINK_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(CONTENT_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(MENU_MANAGEMENT).get());

        Role auditorRole = new Role(RoleName.ROLE_LINK_AUDITOR);
        auditorRole.setDisplayOrder(2);
        auditorRole.addMenu(menuRepository.findByName(CONTENT_MANAGEMENT).get());
        auditorRole.addMenu(menuRepository.findByName(LINK_MANAGEMENT).get());
        auditorRole.addMenu(menuRepository.findByName(LINK_ADD).get());
        auditorRole.addMenu(menuRepository.findByName(LINK_EDIT).get());
        auditorRole.addMenu(menuRepository.findByName(LINK_QUERY).get());
        auditorRole.addMenu(menuRepository.findByName(LINK_DELETE).get());

        Role userRole = new Role(RoleName.ROLE_USER);
        userRole.setDisplayOrder(3);
        userRole.addMenu(menuRepository.findByName(WRITE_ARTICLE).get());

        List<Role> roleList = new ArrayList<>();
        roleList.add(adminRole);
        roleList.add(auditorRole);
        roleList.add(userRole);

        roleRepository.saveAll(roleList);
    }

    @Override
    public void populateUsers() {
        if (userRepository.count() > 0) {
            return;
        }

        ApplicationUser user1 = new ApplicationUser();
        Role adminRole = roleRepository.findByRoleName(RoleName.ROLE_ADMIN.toString()).get();
        user1.addRole(adminRole);
        user1.setUsername("Zachary");
        user1.setNickname("NotNow");
        user1.setPassword(passwordEncoder.encode("123456"));
        user1.setEnable(true);
        user1.setEmail("zach.popping@gmail.com");
        user1.setGender(Gender.MALE);
        user1.setPhoneNumber("416-123-4567");
        user1.setAvatar("https://avatars.githubusercontent.com/u/111215609?v=4");

        ApplicationUser user2 = new ApplicationUser();
        user2.addRole(adminRole);
        user2.setUsername("John");
        user2.setNickname("Milk");
        user2.setPassword(passwordEncoder.encode("123456"));
        user2.setEnable(true);
        user2.setEmail("random.unknown@gmail.com");
        user2.setGender(Gender.MALE);
        user2.setPhoneNumber("000-123-4567");
        user2.setAvatar("https://avatars.githubusercontent.com/u/111215609?v=4");

        List<ApplicationUser> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);
        userRepository.saveAll(users);
    }

    @Override
    public void populateCategories() {
        if (categoryRepository.count() > 0) {
            return;
        }

        Category category1 = new Category();
        category1.setName("java");
        category1.setPid(-1L);
        category1.setDescription("A high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible");
        category1.setEnable(true);

        Category category2 = new Category();
        category2.setName("react");
        category2.setPid(-1L);
        category2.setDescription("A free and open-source front-end JavaScript library for building user interfaces based on components. ");
        category2.setEnable(true);

        List<Category> categories = new ArrayList<>();
        categories.add(category1);
        categories.add(category2);
        categoryRepository.saveAll(categories);
    }

    @Override
    public void populateOutboundLinks() {
        if (linkRepository.count() > 0) {
            return;
        }

        OutboundLink link1 = new OutboundLink();
        link1.setName("Dishsoap");
        link1.setDescription("Link to Dishsoap's blog");
        link1.setAuditStatus(AuditStatus.ACCEPTED);
        link1.setLogo("https://twitter.com/Dishsoaptft/photo");
        link1.setUrl("https://twitter.com/Dishsoaptft");

        OutboundLink link2 = new OutboundLink();
        link2.setName("Milk");
        link2.setDescription("Link to Milk's blog");
        link2.setAuditStatus(AuditStatus.PENDING);
        link2.setLogo("https://twitter.com/MilkTFT/photo");
        link2.setUrl("https://twitter.com/MilkTFT");

        OutboundLink link3 = new OutboundLink();
        link3.setName("setsuko");
        link3.setDescription("Link to setsuko's blog");
        link3.setAuditStatus(AuditStatus.ACCEPTED);
        link3.setLogo("https://twitter.com/setsukotft/photo");
        link3.setUrl("https://twitter.com/setsukotft");

        List<OutboundLink> links = new ArrayList<>();
        links.add(link1);
        links.add(link2);
        links.add(link3);
        linkRepository.saveAll(links);
    }

    @Override
    public void populateTags() {
        if (tagRepository.count() > 0) {
            return;
        }

        Tag tag1 = new Tag();
        tag1.setName("Java");
        tag1.setDescription("A high-level, class-based, object-oriented programming language.");

        Tag tag2 = new Tag();
        tag2.setName("React");
        tag2.setDescription("A free and open-source front-end JavaScript library for building user interfaces based on components.");

        Tag tag3 = new Tag();
        tag3.setName("C#");
        tag3.setDescription("C# is an object-oriented, component-oriented programming language.");

        Tag tag4 = new Tag();
        tag4.setName("Spring Data JPA");
        tag4.setDescription("A Java ORM framework that implemented JPA Based repositories.");

        Tag tag5 = new Tag();
        tag5.setName("MySQL");
        tag5.setDescription("A relational database management system (RDBMS) developed by Oracle.");

        List<Tag> tags = new ArrayList<>();
        tags.add(tag1);
        tags.add(tag2);
        tags.add(tag3);
        tags.add(tag4);
        tags.add(tag5);
        tagRepository.saveAll(tags);
    }

    @Transactional
    @Override
    public void populateMenus() {
        if (menuRepository.count() > 0) {
            return;
        }
        Menu menu1 = new Menu();
        menu1.setName(SYSTEM_MANAGEMENT);
        menu1.setParentId(-1L);
        menu1.setDisplayOrder(1);
        menu1.setRouterPath("system");
        menu1.setComponent(null);
        menu1.setFrame(false);
        menu1.setMenuType(MenuType.CONTENT);
        menu1.setVisible(true);
        menu1.setStatus(MenuStatus.ENABLE);
        menu1.setPermission("");
        menu1.setIcon("system");
        menu1 = menuRepository.save(menu1);

        Menu menu2 = new Menu();
        menu2.setName(USER_MANAGEMENT);
        menu2.setParentId(menu1.getId());
        menu2.setDisplayOrder(1);
        menu2.setRouterPath("user");
        menu2.setComponent("system/user/index");
        menu2.setFrame(false);
        menu2.setMenuType(MenuType.MENU);
        menu2.setVisible(true);
        menu2.setStatus(MenuStatus.ENABLE);
        menu2.setPermission("system:user:list");
        menu2.setIcon("user");
        menu2 = menuRepository.save(menu2);

        Menu menu3 = new Menu();
        menu3.setName(ROLE_MANAGEMENT);
        menu3.setParentId(menu1.getId());
        menu3.setDisplayOrder(2);
        menu3.setRouterPath("role");
        menu3.setComponent("system/role/index");
        menu3.setFrame(false);
        menu3.setMenuType(MenuType.CONTENT);
        menu3.setVisible(true);
        menu3.setStatus(MenuStatus.ENABLE);
        menu3.setPermission("system:role:list");
        menu3.setIcon("peoples");
        menu3 = menuRepository.save(menu3);

        Menu menu4 = new Menu();
        menu4.setName(MENU_MANAGEMENT);
        menu4.setParentId(menu1.getId());
        menu4.setDisplayOrder(3);
        menu4.setRouterPath("menu");
        menu4.setComponent("system/menu/index");
        menu4.setFrame(false);
        menu4.setMenuType(MenuType.MENU);
        menu4.setVisible(true);
        menu4.setStatus(MenuStatus.ENABLE);
        menu4.setPermission("system:menu:list");
        menu4.setIcon("tree-table");
        menu4 = menuRepository.save(menu4);

        Menu menu5 = new Menu();
        menu5.setName(USER_QUERY);
        menu5.setParentId(menu2.getId());
        menu5.setDisplayOrder(1);
        menu5.setRouterPath("");
        menu5.setComponent(null);
        menu5.setFrame(false);
        menu5.setMenuType(MenuType.BUTTON);
        menu5.setVisible(true);
        menu5.setStatus(MenuStatus.ENABLE);
        menu5.setPermission("system:user:query");
        menu5.setIcon("#");
        menuRepository.save(menu5);

        Menu menu6 = new Menu();
        menu6.setName(USER_ADD);
        menu6.setParentId(menu2.getId());
        menu6.setDisplayOrder(2);
        menu6.setRouterPath("");
        menu6.setComponent(null);
        menu6.setFrame(false);
        menu6.setMenuType(MenuType.BUTTON);
        menu6.setVisible(true);
        menu6.setStatus(MenuStatus.ENABLE);
        menu6.setPermission("system:user:add");
        menu6.setIcon("#");
        menuRepository.save(menu6);

        Menu menu7 = new Menu();
        menu7.setName(USER_EDIT);
        menu7.setParentId(menu2.getId());
        menu7.setDisplayOrder(3);
        menu7.setRouterPath("");
        menu7.setComponent(null);
        menu7.setFrame(false);
        menu7.setMenuType(MenuType.BUTTON);
        menu7.setVisible(true);
        menu7.setStatus(MenuStatus.ENABLE);
        menu7.setPermission("system:user:edit");
        menu7.setIcon("#");
        menuRepository.save(menu7);

        Menu menu8 = new Menu();
        menu8.setName(USER_DELETE);
        menu8.setParentId(menu2.getId());
        menu8.setDisplayOrder(4);
        menu8.setRouterPath("");
        menu8.setComponent(null);
        menu8.setFrame(false);
        menu8.setMenuType(MenuType.BUTTON);
        menu8.setVisible(true);
        menu8.setStatus(MenuStatus.ENABLE);
        menu8.setPermission("system:user:remove");
        menu8.setIcon("#");
        menuRepository.save(menu8);

        Menu menu9 = new Menu();
        menu9.setName(USER_EXPORT);
        menu9.setParentId(menu2.getId());
        menu9.setDisplayOrder(5);
        menu9.setRouterPath("");
        menu9.setComponent(null);
        menu9.setFrame(false);
        menu9.setMenuType(MenuType.BUTTON);
        menu9.setVisible(true);
        menu9.setStatus(MenuStatus.ENABLE);
        menu9.setPermission("system:user:export");
        menu9.setIcon("#");
        menuRepository.save(menu9);

        Menu menu10 = new Menu();
        menu10.setName(USER_IMPORT);
        menu10.setParentId(menu2.getId());
        menu10.setDisplayOrder(6);
        menu10.setRouterPath("");
        menu10.setComponent(null);
        menu10.setFrame(false);
        menu10.setMenuType(MenuType.BUTTON);
        menu10.setVisible(true);
        menu10.setStatus(MenuStatus.ENABLE);
        menu10.setPermission("system:user:import");
        menu10.setIcon("#");
        menuRepository.save(menu10);

        Menu menu11 = new Menu();
        menu11.setName(USER_PASSWORD_RESET);
        menu11.setParentId(menu2.getId());
        menu11.setDisplayOrder(7);
        menu11.setRouterPath("");
        menu11.setComponent(null);
        menu11.setFrame(false);
        menu11.setMenuType(MenuType.BUTTON);
        menu11.setVisible(true);
        menu11.setStatus(MenuStatus.ENABLE);
        menu11.setPermission("system:user:resetPwd");
        menu11.setIcon("#");
        menuRepository.save(menu11);

        Menu menu12 = new Menu();
        menu12.setName(ROLE_QUERY);
        menu12.setParentId(menu3.getId());
        menu12.setDisplayOrder(1);
        menu12.setRouterPath("");
        menu12.setComponent(null);
        menu12.setFrame(false);
        menu12.setMenuType(MenuType.BUTTON);
        menu12.setVisible(true);
        menu12.setStatus(MenuStatus.ENABLE);
        menu12.setPermission("system:role:query");
        menu12.setIcon("#");
        menuRepository.save(menu12);

        Menu menu13 = new Menu();
        menu13.setName(ROLE_ADD);
        menu13.setParentId(menu3.getId());
        menu13.setDisplayOrder(2);
        menu13.setRouterPath("");
        menu13.setComponent(null);
        menu13.setFrame(false);
        menu13.setMenuType(MenuType.BUTTON);
        menu13.setVisible(true);
        menu13.setStatus(MenuStatus.ENABLE);
        menu13.setPermission("system:role:add");
        menu13.setIcon("#");
        menuRepository.save(menu13);

        Menu menu14 = new Menu();
        menu14.setName(ROLE_EDIT);
        menu14.setParentId(menu3.getId());
        menu14.setDisplayOrder(3);
        menu14.setRouterPath("");
        menu14.setComponent("");
        menu14.setFrame(false);
        menu14.setMenuType(MenuType.BUTTON);
        menu14.setVisible(true);
        menu14.setStatus(MenuStatus.ENABLE);
        menu14.setPermission("system:role:edit");
        menu14.setIcon("#");
        menuRepository.save(menu14);

        Menu menu15 = new Menu();
        menu15.setName(ROLE_DELETE);
        menu15.setParentId(menu3.getId());
        menu15.setDisplayOrder(4);
        menu15.setRouterPath("");
        menu15.setComponent("");
        menu15.setFrame(false);
        menu15.setMenuType(MenuType.BUTTON);
        menu15.setVisible(true);
        menu15.setStatus(MenuStatus.ENABLE);
        menu15.setPermission("system:role:remove");
        menu15.setIcon("#");
        menuRepository.save(menu15);

        Menu menu16 = new Menu();
        menu16.setName(ROLE_EXPORT);
        menu16.setParentId(menu3.getId());
        menu16.setDisplayOrder(5);
        menu16.setRouterPath("");
        menu16.setComponent("");
        menu16.setFrame(false);
        menu16.setMenuType(MenuType.BUTTON);
        menu16.setVisible(true);
        menu16.setStatus(MenuStatus.ENABLE);
        menu16.setPermission("system:role:export");
        menu16.setIcon("#");
        menuRepository.save(menu16);

        Menu menu17 = new Menu();
        menu17.setName(MENU_QUERY);
        menu17.setParentId(menu4.getId());
        menu17.setDisplayOrder(1);
        menu17.setRouterPath("");
        menu17.setComponent("");
        menu17.setFrame(false);
        menu17.setMenuType(MenuType.BUTTON);
        menu17.setVisible(true);
        menu17.setStatus(MenuStatus.ENABLE);
        menu17.setPermission("system:menu:query");
        menu17.setIcon("#");
        menuRepository.save(menu17);

        Menu menu18 = new Menu();
        menu18.setName(MENU_ADD);
        menu18.setParentId(menu4.getId());
        menu18.setDisplayOrder(2);
        menu18.setRouterPath("");
        menu18.setComponent("");
        menu18.setFrame(false);
        menu18.setMenuType(MenuType.BUTTON);
        menu18.setVisible(true);
        menu18.setStatus(MenuStatus.ENABLE);
        menu18.setPermission("system:menu:add");
        menu18.setIcon("#");
        menuRepository.save(menu18);

        Menu menu19 = new Menu();
        menu19.setName(MENU_EDIT);
        menu19.setParentId(menu4.getId());
        menu19.setDisplayOrder(3);
        menu19.setRouterPath("");
        menu19.setComponent("");
        menu19.setFrame(false);
        menu19.setMenuType(MenuType.BUTTON);
        menu19.setVisible(true);
        menu19.setStatus(MenuStatus.ENABLE);
        menu19.setPermission("system:menu:edit");
        menu19.setIcon("#");
        menuRepository.save(menu19);

        Menu menu20 = new Menu();
        menu20.setName(MENU_DELETE);
        menu20.setParentId(menu4.getId());
        menu20.setDisplayOrder(4);
        menu20.setRouterPath("");
        menu20.setComponent("");
        menu20.setFrame(false);
        menu20.setMenuType(MenuType.BUTTON);
        menu20.setVisible(true);
        menu20.setStatus(MenuStatus.ENABLE);
        menu20.setPermission("system:menu:remove");
        menu20.setIcon("#");
        menuRepository.save(menu20);

        Menu menu21 = new Menu();
        menu21.setName(CONTENT_MANAGEMENT);
        menu21.setParentId(-1L);
        menu21.setDisplayOrder(4);
        menu21.setRouterPath("content");
        menu21.setComponent(null);
        menu21.setFrame(false);
        menu21.setMenuType(MenuType.CONTENT);
        menu21.setVisible(true);
        menu21.setStatus(MenuStatus.ENABLE);
        menu21.setPermission(null);
        menu21.setIcon("table");
        menu21 = menuRepository.save(menu21);

        Menu menu22 = new Menu();
        menu22.setName(CATEGORY_MANAGEMENT);
        menu22.setParentId(menu21.getId());
        menu22.setDisplayOrder(1);
        menu22.setRouterPath("category");
        menu22.setComponent("content/category/index");
        menu22.setFrame(false);
        menu22.setMenuType(MenuType.MENU);
        menu22.setVisible(true);
        menu22.setStatus(MenuStatus.ENABLE);
        menu22.setPermission("content:category:list");
        menu22.setIcon("example");
        menu22 = menuRepository.save(menu22);

        Menu menu23 = new Menu();
        menu23.setName(ARTICLE_MANAGEMENT);
        menu23.setParentId(menu21.getId());
        menu23.setDisplayOrder(0);
        menu23.setRouterPath("article");
        menu23.setComponent("content/article/index");
        menu23.setFrame(false);
        menu23.setMenuType(MenuType.MENU);
        menu23.setVisible(true);
        menu23.setStatus(MenuStatus.ENABLE);
        menu23.setPermission("content:article:list");
        menu23.setIcon("build");
        menuRepository.save(menu23);

        Menu menu24 = new Menu();
        menu24.setName(TAG_MANAGEMENT);
        menu24.setParentId(menu21.getId());
        menu24.setDisplayOrder(6);
        menu24.setRouterPath("tag");
        menu24.setComponent("content/tag/index");
        menu24.setFrame(false);
        menu24.setMenuType(MenuType.MENU);
        menu24.setVisible(true);
        menu24.setStatus(MenuStatus.ENABLE);
        menu24.setPermission("content:tag:index");
        menu24.setIcon("button");
        menuRepository.save(menu24);

        Menu menu25 = new Menu();
        menu25.setName(LINK_MANAGEMENT);
        menu25.setParentId(menu21.getId());
        menu25.setDisplayOrder(4);
        menu25.setRouterPath("link");
        menu25.setComponent("content/link/index");
        menu25.setFrame(false);
        menu25.setMenuType(MenuType.MENU);
        menu25.setVisible(true);
        menu25.setStatus(MenuStatus.ENABLE);
        menu25.setPermission("content:link:list");
        menu25.setIcon("404");
        menu25 = menuRepository.save(menu25);

        Menu menu26 = new Menu();
        menu26.setName(WRITE_ARTICLE);
        menu26.setParentId(-1L);
        menu26.setDisplayOrder(0);
        menu26.setRouterPath("write");
        menu26.setComponent("content/article/write/index");
        menu26.setFrame(false);
        menu26.setMenuType(MenuType.MENU);
        menu26.setVisible(true);
        menu26.setStatus(MenuStatus.ENABLE);
        menu26.setPermission("content:article:writer");
        menu26.setIcon("build");
        menuRepository.save(menu26);

        Menu menu27 = new Menu();
        menu27.setName(LINK_ADD);
        menu27.setParentId(menu25.getId());
        menu27.setDisplayOrder(0);
        menu27.setRouterPath(null);
        menu27.setComponent(null);
        menu27.setFrame(false);
        menu27.setMenuType(MenuType.BUTTON);
        menu27.setVisible(true);
        menu27.setStatus(MenuStatus.ENABLE);
        menu27.setPermission("content:link:add");
        menu27.setIcon("#");
        menuRepository.save(menu27);

        Menu menu28 = new Menu();
        menu28.setName(LINK_EDIT);
        menu28.setParentId(menu25.getId());
        menu28.setDisplayOrder(1);
        menu28.setRouterPath(null);
        menu28.setComponent(null);
        menu28.setFrame(false);
        menu28.setMenuType(MenuType.BUTTON);
        menu28.setVisible(true);
        menu28.setStatus(MenuStatus.ENABLE);
        menu28.setPermission("content:link:edit");
        menu28.setIcon("#");
        menuRepository.save(menu28);

        Menu menu29 = new Menu();
        menu29.setName(LINK_DELETE);
        menu29.setParentId(menu25.getId());
        menu29.setDisplayOrder(1);
        menu29.setRouterPath(null);
        menu29.setComponent(null);
        menu29.setFrame(false);
        menu29.setMenuType(MenuType.BUTTON);
        menu29.setVisible(true);
        menu29.setStatus(MenuStatus.ENABLE);
        menu29.setPermission("content:link:remove");
        menu29.setIcon("#");
        menuRepository.save(menu29);

        Menu menu30 = new Menu();
        menu30.setName(LINK_QUERY);
        menu30.setParentId(menu25.getId());
        menu30.setDisplayOrder(2);
        menu30.setRouterPath(null);
        menu30.setComponent(null);
        menu30.setFrame(false);
        menu30.setMenuType(MenuType.BUTTON);
        menu30.setVisible(true);
        menu30.setStatus(MenuStatus.ENABLE);
        menu30.setPermission("content:link:query");
        menu30.setIcon("#");
        menuRepository.save(menu30);

        Menu menu31 = new Menu();
        menu31.setName(CATEGORY_EXPORT);
        menu31.setParentId(menu22.getId());
        menu31.setDisplayOrder(1);
        menu31.setRouterPath(null);
        menu31.setComponent(null);
        menu31.setFrame(false);
        menu31.setMenuType(MenuType.BUTTON);
        menu31.setVisible(true);
        menu31.setStatus(MenuStatus.ENABLE);
        menu31.setPermission("content:category:export");
        menu31.setIcon("#");
        menuRepository.save(menu31);
    }

    @Override
    public void populateArticles() {
        if (articleRepository.count() > 0) {
            return;
        }

        Article article1 = new Article();
        article1.setTitle("Java Programming 101");
        Category java = categoryRepository.findByName("java").get();
        article1.setCategory(java);
        ApplicationUser zachary =  userRepository.findByUsername("Zachary").get();
        article1.setAuthor(zachary);
        article1.setSummary("The Java 101 series provides a self-guided introduction to Java programming, starting with the basics and covering all the core concepts you need to know to become a productive Java developer.");
        article1.setContent("""
                Java is a simple language. Java was initially modeled after C and C++, minus some potentially confusing features. Pointers, multiple implementation inheritance, and operator overloading are some C/C++ features that are not part of Java. A feature not mandated in C/C++, but essential to Java, is a garbage-collection facility that automatically reclaims objects and arrays.

                Java is an object-oriented language. Java's object-oriented focus lets developers work on adapting Java to solve a problem, rather than forcing us to manipulate the problem to meet language constraints. This is different from a structured language like C. As an example, whereas Java lets you focus on savings account objects, C requires you to think separately about savings account state (such a balance) and behaviors (such as deposit and withdrawal).

                Java is a network-savvy language. Java's extensive network library makes it easy to cope with Transmission Control Protocol/Internet Protocol (TCP/IP) network protocols like HTTP (HyperText Transfer Protocol) and FTP (File Transfer Protocol), and simplifies the task of making network connections. Furthermore, Java programs can access objects across a TCP/IP network, via Uniform Resource Locators (URLs), with the same ease as you would have accessing them from the local file system.""");
        article1.setThumbnail("https://m.media-amazon.com/images/I/51igvtVluHL._AC_UF1000,1000_QL80_.jpg");
        article1.setPinned(true);
        article1.setAllowedComment(false);
        article1.setPublishStatus(PublishStatus.PUBLISHED);
        article1.setViewCount(105L);

        Article article2 = new Article();
        article2.setTitle("React Hooks");
        Category react = categoryRepository.findByName("react").get();
        article2.setCategory(react);
        article2.setAuthor(zachary);
        article2.setSummary("""
                The new React site (react.dev) teaches modern React with function components and Hooks.
                We’ve included diagrams, illustrations, challenges, and over 600 new interactive examples.
                The previous React documentation site has now moved to legacy.reactjs.org.""");
        article2.setContent("""
                You’ve likely performed data fetching, subscriptions, or manually changing the DOM from React components before. We call these operations “side effects” (or “effects” for short) because they can affect other components and can’t be done during rendering.

                The Effect Hook, useEffect, adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API. (We’ll show examples comparing useEffect to these methods in Using the Effect Hook.)""");
        article2.setThumbnail("https://m.media-amazon.com/images/I/51igvtVluHL._AC_UF1000,1000_QL80_.jpg");
        article2.setPinned(true);
        article2.setAllowedComment(false);
        article2.setPublishStatus(PublishStatus.DRAFT);
        article2.setViewCount(0L);

        List<Article> articles = new ArrayList<>();
        articles.add(article1);
        articles.add(article2);
        articleRepository.saveAll(articles);
    }

    @Override
    public void populateComments() {
        if (commentRepository.count() > 0) {
            return;
        }

        Comment comment1 = new Comment();
        comment1.setType(CommentType.ARTICLE);
        comment1.setArticle(articleRepository.getReferenceById(1L));
        comment1.setContent("Hello");
        comment1.setRootCommentId(-1L);
        comment1.setUser(userRepository.getReferenceById(2L));
        comment1 = commentRepository.save(comment1);

        Comment comment2 = new Comment();
        comment2.setType(CommentType.ARTICLE);
        comment2.setArticle(articleRepository.getReferenceById(1L));
        comment2.setContent("Good article");
        comment2.setRootCommentId(comment1.getId());
        comment2.setUser(userRepository.getReferenceById(1L));
        comment2.setToComment(comment1);
        comment2 = commentRepository.save(comment2);

        Comment comment3 = new Comment();
        comment3.setType(CommentType.ARTICLE);
        comment3.setArticle(articleRepository.getReferenceById(1L));
        comment3.setContent("Interesting topic");
        comment3.setToComment(comment2);
        comment3.setRootCommentId(comment1.getId());
        comment3.setUser(userRepository.getReferenceById(2L));
        comment3 = commentRepository.save(comment3);

        Comment comment4 = new Comment();
        comment4.setType(CommentType.ARTICLE);
        comment4.setArticle(articleRepository.getReferenceById(1L));
        comment4.setContent("Good point");
        comment4.setRootCommentId(comment1.getId());
        comment4.setUser(userRepository.getReferenceById(2L));
        comment4.setToComment(comment3);
        commentRepository.save(comment4);

        Comment comment5 = new Comment();
        comment5.setType(CommentType.ARTICLE);
        comment5.setArticle(articleRepository.getReferenceById(1L));
        comment5.setContent("Good take");
        comment5.setRootCommentId(-1L);
        comment5.setUser(userRepository.getReferenceById(2L));
        commentRepository.save(comment5);
    }


}
