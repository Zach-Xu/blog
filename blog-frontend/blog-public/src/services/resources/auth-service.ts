import { resourceAxios } from "../../utils/axios-utils"

export const authService = {
    login: async (request: LoginReq) => {
        return await resourceAxios.post<void, User>('/auth/login', request)
    },
    register: async (request: RegisterReq) => {
        return await resourceAxios.post<void, User>('/auth/register', request)
    },
    logout: async () => {
        return await resourceAxios.post<void, void>('/auth/logout')
    },
    verifyToken: async () => {
        return await resourceAxios.get<void, User>('/auth/token')
    }
}