interface User {
    id: number
    username: string
    avatar: string | undefined
    gender: string | undefined
    roleName: string
    email: string
    permissions: string[]

}


interface LoginRequest {
    email: string
    password: string
}

interface RegisterRequest {

}


interface LoginResponse {
    user: User
}
