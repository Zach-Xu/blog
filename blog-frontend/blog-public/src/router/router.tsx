import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Article from "../pages/articles";
import Layout from "../layout/layout";
import Archive from "../pages/archive";
import About from "../pages/about";
import ArticleDetails from "../pages/article-details";
import NotFound from "../pages/not-found";
import CategoryStats from "../pages/category-stats";
import TagStats from "../pages/tag-stats";
import User from "../pages/user";
import Contact from "../pages/contact";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/articles',
                element: <Article />
            },
            {
                path: '/archive',
                element: <Archive />
            },
            {
                path: '/category',
                element: <CategoryStats />
            },
            {
                path: '/tag',
                element: <TagStats />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/article/:articleId',
                element: <ArticleDetails />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/user',
                element: <User />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },

])