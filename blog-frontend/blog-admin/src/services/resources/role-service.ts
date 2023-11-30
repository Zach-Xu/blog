import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const roleService = {
    getRoles: async ({ pageSize = 5, pageNum = 0, name, enable }: GetRoles) => {
        const result = await resourceAxios.get<void, PageRespsone<Role>>('/roles', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { roleName: name } : {}),
                ...(enable !== null ? { enable } : {})
            },
            headers: requireTokenHeader
        })
        return result
    },
    changeRoleStatus: async ({ id, enable }: ChangeStatusRequest) => {
        const result = await resourceAxios.put<void, void>(`/roles/${id}/status`, {
            enable
        }, {
            headers: requireTokenHeader
        })
        return result
    }
}