import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const categoryService = {
    getAll: async () => {
        const result = await resourceAxios.get<void, Category[]>('/categories/all', {
            headers: requireTokenHeader
        })

        return result
    }
}