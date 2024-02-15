import { resourceAxios } from "../../utils/axios-utils"

export const userService = {
    updateUserInfo: async (request: UpdateUserInfoReq) => {
        const formData = new FormData()
        Object.entries(request).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value)
            }
        })

        await resourceAxios.put<void, void>('/users/userInfo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}