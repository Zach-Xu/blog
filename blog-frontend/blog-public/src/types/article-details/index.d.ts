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