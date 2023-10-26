import { authAxios } from "../utils/axios-utils"




export const authService = {
    login: async (data: LoginRequest) => {
        const result = await authAxios.post<void, LoginResponse | undefined>('/login', {
            ...data
        })
        return result
    },

    register: async (data: RegisterRequest) => {
        const result = await authAxios.post('/register', {

        })
    }
}