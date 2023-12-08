interface UserRow {
    id: number
    username: string
    email: string
    enable: boolean
    createdTime: string
}

interface GetUsers extends PageRequest {
    username?: string
    email?: string
}

interface CreateUserRequest {
    username: string
    phoneNumber: string
    email: string
    password: string
    nickname: string
    gender: string
    enable: boolean
    roleIds: number[]
}