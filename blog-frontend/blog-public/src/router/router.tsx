import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Article from "../pages/article";
import Layout from "../layout/layout";
import Archive from "../pages/archive";
import Category from "../pages/category";
import Tag from "../pages/tag";
import About from "../pages/about";
import ArticleDetails from "../pages/article-details";
import NotFound from "../pages/not-found";

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
                path: '/article',
                element: <Article />
            },
            {
                path: '/archive',
                element: <Archive />
            },
            {
                path: '/category',
                element: <Category />
            },
            {
                path: '/tag',
                element: <Tag />
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
                path: '*',
                element: <NotFound />
            }
        ]
    },

])