import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const tagService = {

    getAll: async () => {
        const result = await resourceAxios.get<void, Tag[]>('/tags/all', {
            headers: requireTokenHeader
        })

        return result
    },

    getTags: async ({ pageSize = 5, pageNum = 0, name, description }: GetTags) => {
        const result = await resourceAxios.get<void, PageRespsone<Tag>>('/tags', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { name } : {}),
                // ...(description ? { description } : {})
            },
            headers: requireTokenHeader
        })
        return result
    },

    createTag: async ({ name, description }: CreateTag) => {
        const result = await resourceAxios.post<void, Tag>('/tags', {
            name,
            description
        }, {
            headers: requireTokenHeader
        })

        return result
    },

    updateTag: async (data: Tag) => {
        const { id, name, description } = data
        await resourceAxios.put<void, void>(`/tags/${id}`, {
            name: data.name,
            description: data.description
        }, {
            headers: requireTokenHeader
        })
    },

    deleteTag: async (id: number) => {
        await resourceAxios.delete<void, void>(`/tags/${id}`, {
            headers: requireTokenHeader
        })
    }


}