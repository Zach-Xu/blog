import { resourceAxios } from "../../utils/axios-utils"

export const commentService = {
    getComments: async ({ articleId, pageNum = 0, pageSize = 5 }: GetCommentsReq) => {
        return await resourceAxios.get<void, PageRespsone<Comment>>(`/comments`, {
            params: {
                articleId,
                pageNum,
                pageSize
            }
        })
    },
    postComment: async (request: PostCommentReq) => {
        return await resourceAxios.post<void, void>('/comments', request)
    },

}