import { useEffect, useState } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/dashboard/welcome";
import Login from "../pages/auth/login";
import TagPage from "../pages/dashboard/content/tag-page";
import WriteArticlePage from "../pages/dashboard/content/write-article-page";
import CategoryPage from "../pages/dashboard/content/category-page";
import ArticlePage from "../pages/dashboard/content/article-page";
import EditArticlePage from "../pages/dashboard/content/edit-article-page";
import MenuPage from "../pages/dashboard/system/menu-page";
import { menuService } from "../services/resources/menu-service";
import DashboardLayout from "../layouts/dashboard/layout";
import SystemManagement from "../pages/dashboard/system";
import ContentManagement from "../pages/dashboard/content";
import NotFound from "../pages/dashboard/not-found";


const MapRouterToComponent: { [key: string]: JSX.Element } = {
    '/system': <SystemManagement />,
    // '/system/user': <UserList />,
    // '/system/role': <RoleList/>,
    '/system/menu': <MenuPage />,
    '/content': <ContentManagement />,
    '/content/article': <ArticlePage />,
    '/content/category': <CategoryPage />,
    '/content/article/write': <WriteArticlePage />,
    '/content/article/edit': <EditArticlePage />,
    // 'content/link': <LinkList/>,
    '/content/tag': <TagPage />,
}

export const useAppRouter = () => {

    const [menus, setMenus] = useState<Menu[]>()

    useEffect(() => {
        const fetchUserMenus = async () => {
            const reuslt = await menuService.getUserMenus()
            setMenus(reuslt)
        }
        fetchUserMenus()
    }, [])

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                {
                    path: '*',
                    element: <NotFound />
                },
                ...generateRouteObject(menus)
            ]
        }

    ])

    return { router }
}

const generateRouteObject = (menus?: Menu[]): RouteObject[] => {
    const routes: RouteObject[] = []
    if (!menus) return routes

    menus.forEach(menu => {
        if (menu.routerPath && MapRouterToComponent[menu.routerPath]) {

            let route: RouteObject = {
                path: `${menu.routerPath}`,
                element: MapRouterToComponent[menu.routerPath]
            }

            if (menu.subMenus && menu.subMenus.length > 0) {
                const subRoutes = generateRouteObject(menu.subMenus)
                route.children = subRoutes
            }
            routes.push(route)
        }
    })

    return routes
}   