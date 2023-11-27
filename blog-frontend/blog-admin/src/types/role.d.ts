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