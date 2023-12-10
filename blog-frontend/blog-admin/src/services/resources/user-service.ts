import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const userService = {

    getUsers: async ({ pageSize = 5, pageNum = 0, username, email }: GetUsers) => {
        const result = await resourceAxios.get<void, PageRespsone<UserRow>>('/users', {
            params: {
                pageSize,
                pageNum,
                ...(username !== '' ? { username } : {}),
                ...(email !== null ? { email } : {})
            },
            headers: requireTokenHeader
        })
        return result
    },

    getUserDetails: async (userId: number) => {
        const result = await resourceAxios.get<void, UserDetails>(`/users/${userId}`, {
            headers: requireTokenHeader
        })

        return result
    },

    changeUserStatus: async ({ id, enable }: ChangeStatusRequest) => {
        const result = await resourceAxios.put<void, void>(`/users/${id}/status`, {
            enable
        }, {
            headers: requireTokenHeader
        })

        return result
    },

    createUser: async (request: CreateUserRequest) => {
        const result = await resourceAxios.post<void, UserRow>('/users', request, {
            headers: requireTokenHeader
        })
        return result
    },

    updateUser: async (request: UpdateUserRequest) => {
        const result = await resourceAxios.put<void, void>(`/users/${request.id}`, request, {
            headers: requireTokenHeader
        })

        return result
    },

    deleteUser: async (id: number) => {
        const result = await resourceAxios.delete<void, void>(`/users/${id}`, {
            headers: requireTokenHeader
        })

        return result
    }

}