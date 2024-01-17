import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Article from "../pages/article";
import Layout from "../layout/layout";
import Archive from "../pages/archive";

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
            }
        ]
    },

])