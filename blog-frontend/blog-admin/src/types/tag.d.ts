interface Tag {
    id: number
    name: string
    description: string
}

interface GetTags extends PageRequest {
    name?: string
    description?: string
}

interface CreateTag {
    name: string
    description: string
}

