import { resourceAxios } from "../../utils/axios-utils"

export const userService = {

    getUsers: async ({ pageSize = 5, pageNum = 0, username, email }: GetUsers) => {
        const result = await resourceAxios.get<void, PageRespsone<UserRow>>('/users', {
            params: {
                pageSize,
                pageNum,
                ...(username !== '' ? { username } : {}),
                ...(email !== '' ? { email } : {})
            }
        })
        return result
    },

    getUserDetails: async (userId: number) => {
        return await resourceAxios.get<void, UserDetails>(`/users/${userId}`)


    },

    changeUserStatus: async ({ id, enable }: ChangeStatusRequest) => {
        return await resourceAxios.put<void, void>(`/users/${id}/status`, {
            enable
        })

    },

    createUser: async (request: CreateUserRequest) => {
        return await resourceAxios.post<void, UserRow>('/users', request)
    },

    updateUser: async (request: UpdateUserRequest) => {
        return await resourceAxios.put<void, void>(`/users/${request.id}`, request)
    },

    deleteUser: async (id: number) => {
        return await resourceAxios.delete<void, void>(`/users/${id}`)
    }

}