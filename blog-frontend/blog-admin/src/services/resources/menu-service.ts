import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const menuService = {
    getAll: async () => {
        const result = await resourceAxios.get<void, Menu[]>('/menus/all', {
            headers: requireTokenHeader
        })
        return result
    },

    getUserMenus: async () => {
        const result = await resourceAxios.get<void, Menu[]>('/menus/user-menu', {
            headers: requireTokenHeader
        })
        return result
    },

    getMenusInTree: async (query: GetMenus) => {
        const { name, enable } = query
        const result = await resourceAxios.get<void, Menu[]>('/menus/all/tree', {
            params: {
                ...(name !== '' ? { name } : {}),
                ...(enable !== null ? { enable } : {})
            },
            headers: requireTokenHeader
        })
        return result
    },

    chanegMenuStatus: async (request: ChangeStatusRequest) => {
        const { id, enable } = request
        await resourceAxios.put<void, void>(`/menus/${id}/status`, {
            enable
        }, {
            headers: requireTokenHeader
        })
    }
}