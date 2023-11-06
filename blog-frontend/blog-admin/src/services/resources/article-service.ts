import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const articleService = {
    createArticle: async (data: WriteArticleRequest) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        await resourceAxios.post<void, void>('/articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...requireTokenHeader
            }
        })
    },
}