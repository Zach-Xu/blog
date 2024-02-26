package com.zach.blog.service.impl;

import com.zach.blog.enums.*;
import com.zach.blog.model.*;

import com.zach.blog.repository.*;
import com.zach.blog.service.DbInitializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    private final SocialPlatformRepository socialPlatformRepository;
    private final SiteInfoRepository siteInfoRepository;

    @Override
    public void populateRoles() {
        if (roleRepository.count() > 0) {
            return;
        }

        Role adminRole = new Role(RoleName.ADMIN);
        adminRole.setDescription("Top-level role, has all permissions");
        adminRole.addMenu(menuRepository.findByName(SYSTEM_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(CATEGORY_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(ROLE_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(LINK_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(CONTENT_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(MENU_MANAGEMENT).get());
        adminRole.addMenu(menuRepository.findByName(WRITE_ARTICLE).get());
        adminRole.addMenu(menuRepository.findByName(EDIT_ARTICLE).get());

        Role userRole = new Role(RoleName.USER);
        userRole.addMenu(menuRepository.findByName(WRITE_ARTICLE).get());
        userRole.setDescription("Regular user, can only write article");

        Role viewerRole = new Role(RoleName.VIEWER);
        viewerRole.addMenu(menuRepository.findByName(USER_INFO_UPDATE).get());
        viewerRole.addMenu(menuRepository.findByName(COMMENT_REPLY).get());

        viewerRole.setDescription("Blog viewer, can only write article");

        List<Role> roleList = new ArrayList<>();
        roleList.add(adminRole);
        roleList.add(userRole);
        roleList.add(viewerRole);
        roleRepository.saveAll(roleList);
    }

    @Override
    public void populateUsers() {
        if (userRepository.count() > 0) {
            return;
        }

        ApplicationUser user1 = new ApplicationUser();
        Role adminRole = roleRepository.findByRoleName(RoleName.ADMIN.name()).get();
        user1.addRole(adminRole);
        user1.setUsername("Zachary");
        user1.setPassword(passwordEncoder.encode("123456"));
        user1.setEnable(true);
        user1.setEmail("zach.popping@gmail.com");
        user1.setGender(Gender.MALE);
        user1.setPhoneNumber("416-123-4567");
        user1.setAvatar("https://avatars.githubusercontent.com/u/111215609?v=4");

//        ApplicationUser user2 = new ApplicationUser();
//        user2.addRole(adminRole);
//        user2.setUsername("John");
//        user2.setPassword(passwordEncoder.encode("123456"));
//        user2.setEnable(true);
//        user2.setEmail("random.unknown@gmail.com");
//        user2.setGender(Gender.MALE);
//        user2.setPhoneNumber("000-123-4567");
//        user2.setAvatar("https://avatars.githubusercontent.com/u/111215609?v=4");

        List<ApplicationUser> users = new ArrayList<>();
        users.add(user1);
//        users.add(user2);
        userRepository.saveAll(users);
    }

    @Override
    public void populateCategories() {
        if (categoryRepository.count() > 0) {
            return;
        }

        Category category1 = new Category();
        category1.setName("Java");
        category1.setPid(-1L);
        category1.setDescription(
                "A high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible");
        category1.setEnable(true);

        Category category2 = new Category();
        category2.setName("React");
        category2.setPid(-1L);
        category2.setDescription(
                "A free and open-source front-end JavaScript library for building user interfaces based on components. ");
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
        tag2.setDescription(
                "A free and open-source front-end JavaScript library for building user interfaces based on components.");

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
        Menu menu1 = Menu.builder().name(SYSTEM_MANAGEMENT)
                .parentId(-1L)
                .displayOrder(1)
                .routerPath("/system")
                .component(null)
                .menuType(MenuType.CONTENT)
                .visible(true)
                .enable(true)
                .permission("system").build();
        menu1 = menuRepository.save(menu1);

        Menu menu2 = Menu.builder().name(USER_MANAGEMENT)
                .parentId(menu1.getId())
                .displayOrder(1)
                .routerPath("/system/user")
                .component("user")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("system:user").build();
        menu2 = menuRepository.save(menu2);


        Menu menu3 = Menu.builder().name(ROLE_MANAGEMENT)
                .parentId(menu1.getId())
                .displayOrder(2)
                .routerPath("/system/role")
                .component("role")
                .menuType(MenuType.CONTENT)
                .visible(true)
                .enable(true)
                .permission("system:role:list").build();
        menu3 = menuRepository.save(menu3);

        Menu menu4 = Menu.builder().name(MENU_MANAGEMENT)
                .parentId(menu1.getId())
                .displayOrder(3)
                .routerPath("/system/menu")
                .component("menu")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("system:menu").build();
        menu4 = menuRepository.save(menu4);

        Menu menu5 = Menu.builder().name(USER_QUERY)
                .parentId(menu2.getId())
                .displayOrder(1)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:user:query").build();
        menuRepository.save(menu5);

        Menu menu6 = Menu.builder().name(USER_ADD)
                .parentId(menu2.getId())
                .displayOrder(2)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:user:add").build();
        menuRepository.save(menu6);

        Menu menu7 = Menu.builder().name(USER_EDIT)
                .parentId(menu2.getId())
                .displayOrder(3)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:user:edit").build();
        menuRepository.save(menu7);

        Menu menu8 = Menu.builder().name(USER_DELETE)
                .parentId(menu2.getId())
                .displayOrder(4)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:user:remove").build();
        menuRepository.save(menu8);

        Menu menu11 = Menu.builder().name(USER_PASSWORD_RESET)
                .parentId(menu2.getId())
                .displayOrder(5)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:user:resetPwd").build();
        menuRepository.save(menu11);

        Menu menu10 = Menu.builder().name(USER_INFO_UPDATE)
                .parentId(menu2.getId())
                .displayOrder(6)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(false)
                .enable(true)
                .permission("system:user:infoUpdate").build();
        menuRepository.save(menu10);

        Menu menu12 = Menu.builder().name(ROLE_QUERY)
                .parentId(menu3.getId())
                .displayOrder(1)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:role:query").build();
        menuRepository.save(menu12);

        Menu menu13 = Menu.builder().name(ROLE_ADD)
                .parentId(menu3.getId())
                .displayOrder(2)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:role:add").build();
        menuRepository.save(menu13);

        Menu menu14 = Menu.builder().name(ROLE_EDIT)
                .parentId(menu3.getId())
                .displayOrder(3)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:role:edit").build();
        menuRepository.save(menu14);

        Menu menu15 = Menu.builder().name(ROLE_DELETE)
                .parentId(menu3.getId())
                .displayOrder(4)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:role:remove").build();
        menuRepository.save(menu15);

        Menu menu17 = Menu.builder().name(MENU_QUERY)
                .parentId(menu4.getId())
                .displayOrder(1)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:menu:query").build();
        menuRepository.save(menu17);

        Menu menu19 = Menu.builder().name(MENU_EDIT)
                .parentId(menu4.getId())
                .displayOrder(2)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:menu:edit").build();
        menuRepository.save(menu19);

        Menu menu20 = Menu.builder().name(MENU_DISABLE)
                .parentId(menu4.getId())
                .displayOrder(3)
                .routerPath("")
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("system:menu:disable").build();
        menuRepository.save(menu20);

        Menu menu21 = Menu.builder().name(CONTENT_MANAGEMENT)
                .parentId(-1L)
                .displayOrder(4)
                .routerPath("/content")
                .component(null)
                .menuType(MenuType.CONTENT)
                .visible(true)
                .enable(true)
                .permission("content").build();
        menu21 = menuRepository.save(menu21);

        Menu menu22 = Menu.builder().name(CATEGORY_MANAGEMENT)
                .parentId(menu21.getId())
                .displayOrder(1)
                .routerPath("/content/category")
                .component("category")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("content:category").build();
        menu22 = menuRepository.save(menu22);

        Menu menu35 = Menu.builder().name(CATEGORY_ADD)
                .parentId(menu22.getId())
                .displayOrder(1)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:category:add").build();
        menuRepository.save(menu35);

        Menu menu36 = Menu.builder().name(CATEGORY_EDIT)
                .parentId(menu22.getId())
                .displayOrder(2)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:category:edit").build();
        menuRepository.save(menu36);

        Menu menu37 = Menu.builder().name(CATEGORY_DELETE)
                .parentId(menu22.getId())
                .displayOrder(3)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:category:remove").build();
        menuRepository.save(menu37);

        Menu menu38 = Menu.builder().name(CATEGORY_DELETE)
                .parentId(menu22.getId())
                .displayOrder(4)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:category:query").build();
        menuRepository.save(menu38);

        Menu menu24 = Menu.builder().name(TAG_MANAGEMENT)
                .parentId(menu21.getId())
                .displayOrder(2)
                .routerPath("/content/tag")
                .component("tag")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("content:tag").build();
        menu24= menuRepository.save(menu24);

        Menu menu39 = Menu.builder().name(TAG_ADD)
                .parentId(menu24.getId())
                .displayOrder(1)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:tag:add").build();
        menuRepository.save(menu39);

        Menu menu40 = Menu.builder().name(TAG_EDIT)
                .parentId(menu24.getId())
                .displayOrder(2)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:tag:edit").build();
        menuRepository.save(menu40);

        Menu menu41 = Menu.builder().name(TAG_DELETE)
                .parentId(menu24.getId())
                .displayOrder(3)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:tag:remove").build();
        menuRepository.save(menu41);

        Menu menu42 = Menu.builder().name(TAG_QUERY)
                .parentId(menu24.getId())
                .displayOrder(4)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:tag:query").build();
        menuRepository.save(menu42);

        Menu menu23 = Menu.builder().name(ARTICLE_MANAGEMENT)
                .parentId(menu21.getId())
                .displayOrder(1)
                .routerPath("/content/article")
                .component("article")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("content:article").build();
        menu23 = menuRepository.save(menu23);



        Menu menu25 = Menu.builder().name(LINK_MANAGEMENT)
                .parentId(menu21.getId())
                .displayOrder(3)
                .routerPath("/content/tag")
                .component("link")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("content:link").build();
        menu25 = menuRepository.save(menu25);

        Menu menu27 = Menu.builder().name(LINK_ADD)
                .parentId(menu25.getId())
                .displayOrder(2)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:link:add").build();
        menuRepository.save(menu27);

        Menu menu28 = Menu.builder().name(LINK_EDIT)
                .parentId(menu25.getId())
                .displayOrder(3)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:link:edit").build();
        menuRepository.save(menu28);

        Menu menu29 = Menu.builder().name(LINK_DELETE)
                .parentId(menu25.getId())
                .displayOrder(4)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:link:remove").build();
        menuRepository.save(menu29);

        Menu menu30 = Menu.builder().name(LINK_QUERY)
                .parentId(menu25.getId())
                .displayOrder(1)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(true)
                .enable(true)
                .permission("content:link:query").build();
        menuRepository.save(menu30);

        Menu menu26 = Menu.builder().name(WRITE_ARTICLE)
                .parentId(-1L)
                .displayOrder(1)
                .routerPath("/content/article/write")
                .component("write")
                .menuType(MenuType.MENU)
                .visible(true)
                .enable(true)
                .permission("content:article:write").build();
        menuRepository.save(menu26);

        Menu menu32 = Menu.builder().name(EDIT_ARTICLE)
                .parentId(-1L)
                .displayOrder(1)
                .routerPath("/content/article/edit")
                .component("edit")
                .menuType(MenuType.MENU)
                .visible(false)
                .enable(true)
                .permission("content:article:edit").build();
        menuRepository.save(menu32);


        Menu menu33 = Menu.builder().name(COMMENT_MANAGEMENT)
                .parentId(menu21.getId())
                .displayOrder(4)
                .routerPath("/content/comment")
                .component("comment")
                .menuType(MenuType.MENU)
                .visible(false)
                .enable(true)
                .permission("content:comment").build();
        menu33 = menuRepository.save(menu33);

        Menu menu34 = Menu.builder().name(COMMENT_REPLY)
                .parentId(menu33.getId())
                .displayOrder(1)
                .routerPath(null)
                .component(null)
                .menuType(MenuType.BUTTON)
                .visible(false)
                .enable(true)
                .permission("content:comment:reply").build();
        menuRepository.save(menu34);

    }

    @Override
    public void populateSiteInfo() {

        if (socialPlatformRepository.count() > 0) {
            return;
        }
        SocialPlatform social1 = new SocialPlatform();
        social1.setName("GitHub");
        social1.setUrl("https://github.com/Zach-Xu");

        SocialPlatform social2 = new SocialPlatform();
        social2.setName("LinkedIn");
        social2.setUrl("https://www.linkedin.com/in/zach-xu-b45293262");

        SocialPlatform social3 = new SocialPlatform();
        social3.setName("WhatsApp");
        social3.setUrl("https://wa.me/14167104222");

        social1 = socialPlatformRepository.save(social1);
        social2 = socialPlatformRepository.save(social2);
        social3 = socialPlatformRepository.save(social3);

        SiteInfo siteInfo = new SiteInfo();
        ApplicationUser owner = userRepository.getReferenceById(1L);
        siteInfo.setOwner(owner);

        List<SocialPlatform> socials = new ArrayList<>();
        socials.add(social1);
        socials.add(social2);
        socials.add(social3);

        siteInfo.setAboutMe("Aspire to be an ever-evolving full-stack developer, committed to continuous learning and growth in the dynamic realm of programming.\n\n```java\nSystem.out.println(\"Hello World\")\n```");
        siteInfo.setSocials(socials);
        siteInfo.setHostSince(LocalDateTime.now());
        siteInfo.setVisitCount(0L);
        siteInfoRepository.save(siteInfo);
    }

    @Override
    public void populateArticles() {
        if (articleRepository.count() > 0) {
            return;
        }

        Article article1 = new Article();
        article1.setTitle("Java Programming 101");
        Category java = categoryRepository.findByName("Java").get();
        article1.setCategory(java);
        ApplicationUser zachary = userRepository.findByUsername("Zachary").get();
        article1.setAuthor(zachary);
        article1.setSummary(
                "The Java 101 series provides a self-guided introduction to Java programming, starting with the basics and covering all the core concepts you need to know to become a productive Java developer.");
        article1.setContent(
                """
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
        Category react = categoryRepository.findByName("React").get();
        article2.setCategory(react);
        article2.setAuthor(zachary);
        article2.setSummary("""
                The new React site (react.dev) teaches modern React with function components and Hooks.
                We’ve included diagrams, illustrations, challenges, and over 600 new interactive examples.
                The previous React documentation site has now moved to legacy.reactjs.org.""");
        article2.setContent(
                """
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
