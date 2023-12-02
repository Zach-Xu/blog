export const getTreeIds = (menu: Menu): number[] => {
    let treeIds: number[] = []

    if (menu.subMenus && menu.subMenus.length > 0) {
        treeIds = menu.subMenus.flatMap(menu => getTreeIds(menu))
        treeIds.push(menu.id)
    } else {
        treeIds = [menu.id]
    }
    return treeIds
}

export const getMenuById = (id: number, menus: Menu[]): Menu | undefined => {
    for (const menu of menus) {
        if (menu.id === id) {
            return menu
        }

        if (menu.subMenus && menu.subMenus.length > 0) {
            const foundMenu = getMenuById(id, menu.subMenus)
            if (foundMenu) {
                return foundMenu
            }
        }
    }
    return undefined
}

export const allSiblingsCheck = (menu: Menu, selected: number[], menus: Menu[]): boolean => {
    let check = true
    const parent = getMenuById(menu.parentId, menus)
    if (!parent) {
        return false
    }

    if (!parent.subMenus || parent.subMenus.length === 0) {
        return false
    }

    for (const sibling of parent.subMenus) {
        if (sibling.id === menu.id) {
            continue
        } else {
            if (!selected.includes(sibling.id)) {
                return false
            }
        }
    }
    return check
}

export const getAncestorIds = (menu: Menu, menus: Menu[] | undefined): number[] => {
    if (!menus) return []
    let ids: number[] = []
    const parent = getMenuById(menu.parentId, menus)
    if (parent) {
        ids.push(parent.id)
        ids = ids.concat(getAncestorIds(parent, menus))

    }
    return ids
}

export const checkAncestors = (menu: Menu, selected: number[], menus: Menu[] | undefined, ids: number[]) => {
    if (!menus) return

    if (allSiblingsCheck(menu, selected, menus)) {
        ids.push(menu.parentId)
        const parent = getMenuById(menu.parentId, menus)
        if (!parent) {
            return
        }
        checkAncestors(parent, selected, menus, ids)
    }
}
