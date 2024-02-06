import { resourceAxios } from "../../utils/axios-utils"

export const articleService = {
    getArticles: async ({ pageSize = 4, pageNum = 0, categoryId, tagId }: ArticleSearchParams) => {
        return await resourceAxios.get<void, PageRespsone<Article>>('/articles', {
            params: {
                pageSize,
                pageNum,
                ...(categoryId ? { categoryId } : {}),
                ...(tagId ? { tagId } : {})
            }
        })
    },
    getArticleDetails: async (articleId: number | string) => {
        return await resourceAxios.get<void, ArticleDetails>(`/articles/${articleId}`)
    },

    updateArticleViewCount: async (articleId: number | string) => {
        return await resourceAxios.put<void, void>(`/articles/view-count/${articleId}`)
    }
}