import { resourceAxios } from "../../utils/axios-utils"


export const commentService = {
    getArticleComments: async ({ articleId, pageNum = 0, pageSize = 5 }: GetCommentsReq) => {
        return await resourceAxios.get<void, PageRespsone<Comment>>(`/comments/article`, {
            params: {
                articleId,
                pageNum,
                pageSize
            }
        })
    },

    getContactComments: async ({ pageNum = 0, pageSize = 5 }: PageRequest) => {
        return await resourceAxios.get<void, PageRespsone<Comment>>('/comments/contact', {
            params: {
                pageNum,
                pageSize
            }
        })
    },

    postArticleComment: async (request: PostCommentReq) => {
        return await resourceAxios.post<void, void>('/comments/article', request)
    },

    postContactComment: async (request: PostCommentReq) => {
        const tempUsername = localStorage.getItem('tempUsername')
        if (tempUsername) {
            request = {
                ...request,
                tempUsername
            }
        }
        return await resourceAxios.post<void, PostContactCommentResp | void>('/comments/contact', request)
    },


}