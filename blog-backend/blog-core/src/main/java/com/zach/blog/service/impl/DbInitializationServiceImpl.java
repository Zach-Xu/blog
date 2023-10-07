package com.zach.blog.service.impl;

import com.zach.blog.enums.*;
import com.zach.blog.model.*;

import com.zach.blog.repository.ApplicationUserRepository;
import com.zach.blog.repository.ArticleRepository;
import com.zach.blog.repository.CommentRepository;
import com.zach.blog.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DbInitializationServiceImpl implements DbInitializationService {
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final ApplicationUserService userService;
    private final CategoryService categoryService;
    private final ArticleService articleService;
    private final OutboundLinkService linkService;
    private final CommentService commentService;
    private final CommentRepository commentRepository;
    private final ApplicationUserRepository userRepository;
    private final ArticleRepository articleRepository;

    @Override
    public void populateRoles() {
        Role userRole = new Role(Authority.ROLE_USER);
        Role adminRole = new Role(Authority.ROLE_ADMIN);

        List<Role> roleList = new ArrayList<>();
        roleList.add(userRole);
        roleList.add(adminRole);
        roleService.createRoles(roleList);
    }

    @Override
    public void populateUsers() {
        ApplicationUser user1 = new ApplicationUser();
        Role adminRole = roleService.findOrCreateRole(Authority.ROLE_ADMIN);
        user1.addAuthority(adminRole);
        user1.setUsername("Zachary");
        user1.setNickname("NotNow");
        user1.setPassword(passwordEncoder.encode("123456"));
        user1.setEnable(true);
        user1.setEmail("zach.popping@gmail.com");
        user1.setGender(Gender.MALE);
        user1.setPhoneNumber("416-123-4567");
        user1.setAvatar("https://avatars.githubusercontent.com/u/111215609?v=4");

        ApplicationUser user2 = new ApplicationUser();
        user2.addAuthority(adminRole);
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
        userService.createUsers(users);
    }

    @Override
    public void populateCategories() {
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
        categoryService.createCategories(categories);
    }

    @Override
    public void populateOutboundLinks() {
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

        linkService.createOutboundLinks(links);
    }

    @Override
    public void populateArticles() {
        Article article1 = new Article();
        article1.setTitle("Java Programming 101");
        Category java = categoryService.findByCategoryName("java");
        article1.setCategory(java);
        ApplicationUser zachary = userService.findUserByUsername("Zachary");
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
        Category react = categoryService.findByCategoryName("react");
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

        articleService.createArticles(articles);
    }

    @Override
    public void populateComments() {
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
