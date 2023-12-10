interface UserRow {
    id: number
    username: string
    nickname: string
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
    nickname: string
    phoneNumber: string
    email: string
    password: string
    gender: 'MALE' | 'FEMALE' | 'UNKOWN' | ''
    enable: boolean
    roleIds: number[]
}

interface UpdateUserRequest extends CreateUserRequest {
    id: number
}

type UserDetails = Omit<CreateUserRequest, 'password'> & {
    id: number
}