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

interface Article {
    id: number
    pinned: boolean
    createdTime: string
    tags: {
        id: number
        tagName: string
    }[]
    title: string
    summary: string
    category: {
        id: number
        name: string
    }
    thumbnail: string
}

interface SiteStats {
    articleCount: number
    hostSince: string
    visitCount: number
}

