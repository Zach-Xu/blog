import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const categoryService = {
    getAll: async () => {
        const result = await resourceAxios.get<void, Category[]>('/categories/all', {
            headers: requireTokenHeader
        })

        return result
    },

    getCategories: async ({ pageSize = 5, pageNum = 0, name, enable }: GetCategories) => {
        const result = await resourceAxios.get<void, PageRespsone<Category>>('/categories', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { name } : {}),
                ...(enable !== null ? { enable } : {})
            },
            headers: requireTokenHeader
        })
        return result
    },

    changeCategoryStatus: async ({ id, enable }: ChangeStatusRequest) => {
        const result = await resourceAxios.put<void, void>(`/categories/${id}/status`, {
            enable
        }, {
            headers: requireTokenHeader
        })

        return result
    },

    createCategory: async (data: CreateCategory) => {
        const result = await resourceAxios.post<void, Category>('/categories', data, {
            headers: requireTokenHeader
        })
        return result
    },

    updateCategory: async ({ id, category }: UpdateCategory) => {
        const result = await resourceAxios.put<void, void>(`/categories/${id}`, category, {
            headers: requireTokenHeader
        })

        return result
    },

    getParentCategories: async () => {
        const result = await resourceAxios.get<void, ParentCategory[]>('/categories/parent', {
            headers: requireTokenHeader
        })
        return result
    },

    deleteCategory: async (id: number) => {
        const result = await resourceAxios.delete<void, void>(`/categories/${id}`, {
            headers: requireTokenHeader
        })

        return result
    }

}