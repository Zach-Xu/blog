interface WriteArticle {
    title: string
    content: string
    categoryId: number | undefined
    tagIds: number[]
    summary: string
    pinned: boolean
    allowedComment: boolean
}

interface WriteArticleRequest extends WriteArticle {
    image?: File
    publishStatus: PublishStatus
}

interface GetArticles extends PageRequest {
    title?: string
    summary?: string
}

interface Article {
    id: number
    title: string
    summary: string
    createdTime: string
}

interface ArticleDetails {
    id: number
    title: string
    summary: string
    content: string
    thumbnail: string
    viewCount: number
    createdTime: String
    pinned: boolean
    allowedComment: boolean
    category: {
        id: number
        name: string
    }
    tags: {
        id: number
        name: string
    }[] | null
}

interface UpdateArticle {
    title: string
    content: string
    categoryId: number | undefined
    tagIds: number[]
    summary: string
    pinned: boolean
    allowedComment: boolean
    publishStatus: PublishStatus
    image?: File
}

interface UpdateArticleRequest {
    id: number
    article: UpdateArticle

}

type PublishStatus = "PUBLISHED" | "DRAFT"