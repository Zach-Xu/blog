interface WriteArticle {
    title: string | undefined
    content: string | undefined
    categoryId: number | undefined
    tagIds: number[] | undefined
    summary: string | undefined
    pinned: boolean | undefined
    allowedComment: boolean | undefined
}

interface WriteArticleRequest extends WriteArticle {
    image?: File
    publishStatus: PublishStatus
}


interface ArticleResponse {
    id: number
    title: string
    summary: string
    createdTime: Date
}

type PublishStatus = "PUBLISHED" | "DRAFT"