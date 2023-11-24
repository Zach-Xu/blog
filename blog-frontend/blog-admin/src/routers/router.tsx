import { useEffect } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { menu } from "../data/menu";
import Welcome from "../pages/dashboard/welcome";
import Login from "../pages/auth/login";
import TagPage from "../pages/dashboard/content/tag-page";
import WriteArticlePage from "../pages/dashboard/content/write-article-page";
import CategoryPage from "../pages/dashboard/content/category-page";
import ArticlePage from "../pages/dashboard/content/article-page";
import EditArticlePage from "../pages/dashboard/content/edit-article-page";


const MapRouterToComponent: { [key: string]: JSX.Element } = {
    // 'system/user/index': <UserList />,
    // 'system/role/index': <RoleList/>,
    // 'system/menu/index': <MenuList/>,
    'content/article/index': <ArticlePage />,
    'content/category/index': <CategoryPage />,
    // 'content/link/index': <LinkList/>,
    'content/tag/index': <TagPage />,
}

export const useAppRouter = () => {

    const menus = menu.data

    useEffect(() => {
        // call api to fetch dynamic routers

    }, [])

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <Welcome />
        },
        {
            path: '*',
            element: <Login />
        },
        {
            path: '/write',
            element: <WriteArticlePage />
        },
        {
            path: '/edit',
            element: <EditArticlePage />
        },
        ...generateRouteObject(menus)
    ])

    return { router }
}

const generateRouteObject = (menus: MenuTree[]): RouteObject[] => {
    const routes: RouteObject[] = []

    menus.forEach(menu => {
        if (menu.component !== null && MapRouterToComponent[menu.component]) {
            routes.push({
                path: `/${menu.routerPath}`,
                element: MapRouterToComponent[menu.component]
            })
        }
        if (menu.subMenus && menu.subMenus?.length !== 0) {
            const subRoutes = generateRouteObject(menu.subMenus)
            routes.push(...subRoutes)
        }
    })

    return routes
}   