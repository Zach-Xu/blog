export const menu = {
    "code": 200,
    "message": "Action successful",
    "data": [
        {
            "menu": {
                "id": 21,
                "deleted": false,
                "name": "Content management",
                "parentId": -1,
                "displayOrder": 4,
                "routerPath": "content",
                "component": null,
                "frame": false,
                "menuType": "CONTENT",
                "visible": true,
                "status": "ENABLE",
                "permission": null,
                "icon": "table"
            },
            "subMenus": [
                {
                    "id": 23,
                    "deleted": false,
                    "name": "Article management",
                    "parentId": 21,
                    "displayOrder": 0,
                    "routerPath": "article",
                    "component": "content/article/index",
                    "frame": false,
                    "menuType": "MENU",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "content:article:list",
                    "icon": "build"
                },
                {
                    "id": 22,
                    "deleted": false,
                    "name": "Category management",
                    "parentId": 21,
                    "displayOrder": 1,
                    "routerPath": "category",
                    "component": "content/category/index",
                    "frame": false,
                    "menuType": "MENU",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "content:category:list",
                    "icon": "example"
                },
                {
                    "id": 25,
                    "deleted": false,
                    "name": "Link management",
                    "parentId": 21,
                    "displayOrder": 4,
                    "routerPath": "link",
                    "component": "content/link/index",
                    "frame": false,
                    "menuType": "MENU",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "content:link:list",
                    "icon": "404"
                },
                {
                    "id": 24,
                    "deleted": false,
                    "name": "Tag management",
                    "parentId": 21,
                    "displayOrder": 6,
                    "routerPath": "tag",
                    "component": "content/tag/index",
                    "frame": false,
                    "menuType": "MENU",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "content:tag:index",
                    "icon": "button"
                }
            ]
        },
        {
            "menu": {
                "id": 1,
                "deleted": false,
                "name": "System management",
                "parentId": -1,
                "displayOrder": 1,
                "routerPath": "system",
                "component": null,
                "frame": false,
                "menuType": "CONTENT",
                "visible": true,
                "status": "ENABLE",
                "permission": "",
                "icon": "system"
            },
            "subMenus": [
                {
                    "id": 2,
                    "deleted": false,
                    "name": "User management",
                    "parentId": 1,
                    "displayOrder": 1,
                    "routerPath": "user",
                    "component": "system/user/index",
                    "frame": false,
                    "menuType": "MENU",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "system:user:list",
                    "icon": "user"
                },
                {
                    "id": 3,
                    "deleted": false,
                    "name": "Role management",
                    "parentId": 1,
                    "displayOrder": 2,
                    "routerPath": "role",
                    "component": "system/role/index",
                    "frame": false,
                    "menuType": "CONTENT",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "system:role:list",
                    "icon": "peoples"
                },
                {
                    "id": 4,
                    "deleted": false,
                    "name": "Menu management",
                    "parentId": 1,
                    "displayOrder": 3,
                    "routerPath": "menu",
                    "component": "system/menu/index",
                    "frame": false,
                    "menuType": "MENU",
                    "visible": true,
                    "status": "ENABLE",
                    "permission": "system:menu:list",
                    "icon": "tree-table"
                }
            ]
        }
    ]
}