import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const roleService = {
    getRoles: async ({ pageSize = 5, pageNum = 0, name, enable }: GetRoles) => {
        const result = await resourceAxios.get<void, PageRespsone<Role>>('/roles', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { name } : {}),
                ...(enable !== null ? { enable } : {})
            },
            headers: requireTokenHeader
        })
        return result
    }
}