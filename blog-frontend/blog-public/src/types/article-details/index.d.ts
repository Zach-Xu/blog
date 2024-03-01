interface ArticleDetails {
    id: number
    title: string
    summary: string
    content: string
    thumbnail: string
    viewCount: number
    createdTime: string
    modifiedOn: string
    pinned: boolean
    allowedComment: boolean
    category: Category
    tags: Tag[]
    previousArticle: AdjacentArticle
    nextArticle: AdjacentArticle
}

interface AdjacentArticle {
    id: number
    title: string
    thumbnail: string
}

interface ReplyUser {
    commentId: number
    username: string
}

interface PostCommentReq {
    articleId?: number
    content: string
    tempUsername?: string
    rootCommentId: number
    toCommentId?: number
}

interface PostContactCommentResp {
    tempUsername?: string
}

interface GetCommentsReq extends PageRequest {
    articleId: number
}

interface Comment {
    articleId: number
    commentId: number
    toCommentId: number
    content: string
    userId: number
    toUserId: number
    createdTime: string
    rootCommentId: string
    username: string
    toUsername?: string
    subComments: Comment[]
    userAvatar: string
}
