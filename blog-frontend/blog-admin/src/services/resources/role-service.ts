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

    getAllActiveRoles: async () => {
        const result = await resourceAxios.get<void, RoleNameResponse[]>('/roles/all', {
            headers: requireTokenHeader
        })
        return result
    },

    getRoleDetails: async (roleId: number) => {
        const result = await resourceAxios.get<void, EditRole>(`/roles/${roleId}`, {
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
    },

    createRole: async (request: CreateRoleRequest) => {
        const result = await resourceAxios.post<void, Role>('/roles', request, {
            headers: requireTokenHeader
        })
        return result
    },

    updateRole: async (request: UpdateRoleRequest) => {
        const { id: roleId } = request
        const result = await resourceAxios.put<void, void>(`/roles/${roleId}`, {
            ...request
        }, {
            headers: requireTokenHeader
        })
        return result
    },

    deleteRole: async (roleId: number) => {
        await resourceAxios.delete<void, void>(`/roles/${roleId}`, {
            headers: requireTokenHeader
        })
    }
}