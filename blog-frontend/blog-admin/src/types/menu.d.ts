interface Menu {
    id: number
    name: string
    enable: boolean
    parentId: number
    displayOrder: number
    visible: boolean
    routerPath: string | undefined
    component: null | string
    permission: null | string
    subMenus: null | Menu[]
}

interface GetMenus {
    name?: string
    enable?: boolean | null
}

