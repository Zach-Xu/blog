/// <reference types="vite/client" />

interface Menu {
    id: number
    name: string
    parentId: number
    displayOrder: number
    routerPath: string
    component: null | string
    permission: null | string
    icon: null | string
}

interface MenuTree extends Menu {
    subMenus?: MenuTree[]
}

interface Tag {
    id: number
    name: string
    description: string
}

