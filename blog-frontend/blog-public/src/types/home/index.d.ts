interface UserCard {
    avatar: string
    username: string
    articleCount: number
    categoryCount: number
    tagCount: number
    socials: {
        id: number
        name: string
        url: string
    }[]
}

interface FeaturedArticle {
    id: number
    pinned: boolean
    createdTime: string
    tags: Tag[]
    title: string
    summary: string
    category: Category
    thumbnail: string
}

interface SiteStats {
    articleCount: number
    hostSince: string
    visitCount: number
}

interface Category {
    id: number
    name: string
}

interface Tag {
    id: number
    name: string
}

interface AboutMe {
    content: string
    avatar: string
}

interface LatestComment {
    content: string
    username: string
    createdTime: string
    userAvatar: string
}