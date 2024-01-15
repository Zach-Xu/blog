import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Article from "../pages/article";
import Layout from "../layout/layout";

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
            }
        ]
    },

])