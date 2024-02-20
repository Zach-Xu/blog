import { resourceAxios } from "../../utils/axios-utils"

export const roleService = {
    getRoles: async ({ pageSize = 5, pageNum = 0, name, enable }: GetRoles) => {
        const result = await resourceAxios.get<void, PageRespsone<Role>>('/roles', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { roleName: name } : {}),
                ...(enable !== null ? { enable } : {})
            }
        })
        return result
    },

    getAllActiveRoles: async () => {
        return await resourceAxios.get<void, RoleNameResponse[]>('/roles/all')
    },

    getRoleDetails: async (roleId: number) => {
        return await resourceAxios.get<void, EditRole>(`/roles/${roleId}`)
    },

    changeRoleStatus: async ({ id, enable }: ChangeStatusRequest) => {
        return await resourceAxios.put<void, void>(`/roles/${id}/status`, {
            enable
        })
    },

    createRole: async (request: CreateRoleRequest) => {
        return await resourceAxios.post<void, Role>('/roles', request)
    },

    updateRole: async (request: UpdateRoleRequest) => {
        const { id: roleId } = request
        const result = await resourceAxios.put<void, void>(`/roles/${roleId}`, {
            ...request
        })
        return result
    },

    deleteRole: async (roleId: number) => {
        await resourceAxios.delete<void, void>(`/roles/${roleId}`)
    }
}