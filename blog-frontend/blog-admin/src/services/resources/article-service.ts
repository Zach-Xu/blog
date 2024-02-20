import { resourceAxios } from "../../utils/axios-utils"

export const articleService = {
    createArticle: async (data: WriteArticleRequest) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        await resourceAxios.post<void, void>('/articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    getArticles: async ({ pageSize = 5, pageNum = 0, title, summary }: GetArticles) => {
        const result = await resourceAxios.get<void, PageRespsone<Article>>('/articles', {
            params: {
                pageSize,
                pageNum,
                ...(title !== '' ? { title } : {}),
                ...(summary !== '' ? { summary } : {})
            }
        })
        return result
    },

    getArticleDetails: async (id: number) => {
        const result = await resourceAxios.get<void, ArticleDetails>(`/articles/${id}`)
        return result
    },

    updateArticle: async ({ id, article }: UpdateArticleRequest) => {
        const formData = new FormData()
        Object.entries(article).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const result = await resourceAxios.put<void, Article>(`/articles/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return result
    },

    deleteArticle: async (id: number) => {
        const result = await resourceAxios.delete<void, void>(`/articles/${id}`)
        return result
    }

}