interface Article {
    id: number
    title: string
    createdTime: string
    category: Category
    tags: Tag[]
    thumbnail: string
}

interface ArticleSearchParams {
    pageSize?: number
    pageNum?: number
    categoryId?: number
    tagId?: number
}