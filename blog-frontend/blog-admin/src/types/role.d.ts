interface Role {
    id: number
    roleName: string
    displayOrder: number
    enable: boolean
    createdTime: string
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

interface 