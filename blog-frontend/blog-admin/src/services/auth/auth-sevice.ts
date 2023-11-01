import { authAxios, requireTokenHeader } from "../../utils/axios-utils"


export const authService = {
    login: async (data: LoginRequest) => {
        const result = await authAxios.post<void, LoginResponse>('/login', {
            ...data,
        })
        return result
    },

    register: async (data: RegisterRequest) => {
        const result = await authAxios.post('/register', {

        })
    },

    logout: async () => {
        await authAxios.post('/logout', {}, {
            headers: requireTokenHeader
        })
    },

    verifyToken: async () => {
        const result = await authAxios.get<void, User>('/token', {
            headers: requireTokenHeader
        })

        return result
    }
}