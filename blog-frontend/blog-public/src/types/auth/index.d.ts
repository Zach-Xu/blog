interface LoginReq {
    email: string
    password: string
}

type RegisterReq = LoginReq


interface User {
    id: number
    email?: string
    username: string
    avatar?: string
    gender?: string
}

interface Role {
    id: number
    roleName: string
}