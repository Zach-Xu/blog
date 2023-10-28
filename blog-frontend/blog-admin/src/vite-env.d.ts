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

interface PageRequest {
    pageSize?: number
    pageNum?: number
}

interface PageRespsone<T> {
    rows: T[]
    totalPages: number
    total: number
}
