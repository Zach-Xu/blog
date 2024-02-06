import { resourceAxios } from "../../utils/axios-utils"

export const categoryService = {
    getCategoryStats: async () => {
        return await resourceAxios.get<void, CategoryStats[]>('/categories/stats')
    }
}