interface Role {
    id: number
    roleName: string
    description: string
    enable: boolean
    createdTime: string
}

interface RoleNameResponse {
    id: number
    roleName: string
}

interface GetRoles extends PageRequest {
    name?: string
    enable?: boolean | null
}

interface CreateRoleRequest {
    roleName: string
    enable: boolean
    menuIds: number[]
    description: string
}

interface UpdateRoleRequest extends CreateRoleRequest {
    id: number
}

type EditRole = UpdateRoleRequest

