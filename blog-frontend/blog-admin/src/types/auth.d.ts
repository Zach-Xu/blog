interface User {
    id: number
    username: string
    avatar: string | undefined
    gender: string | undefined
    roles: {
        id: number
        roleName: string
    }[]
}

interface LoginRequest {
    username: string
    password: string
}

interface RegisterRequest {

}


interface LoginResponse {
    user: User
    jwt: string
}
