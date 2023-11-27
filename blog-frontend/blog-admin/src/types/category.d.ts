interface Category {
    id: number
    name: string
    description: string
    enable: boolean
    pid: number
}

interface GetCategories extends PageRequest {
    name?: string
    enable?: boolean | null
}

interface CreateCategory {
    name: string
    description: string
    enable: boolean
    pid: number
}

interface UpdateCategory {
    category: CreateCategory
    id: number
}

interface ParentCategory {
    id: number
    name: string
}

