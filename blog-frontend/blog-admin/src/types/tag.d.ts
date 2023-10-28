interface Tag {
    id: number
    name: string
    description: string
}

interface GetTags extends PageRequest {
    name?: string
    description?: string
}