import { resourceAxios } from "../../utils/axios-utils"

export const tagService = {

    getAll: async () => {
        return await resourceAxios.get<void, Tag[]>('/tags/all')
    },

    getTags: async ({ pageSize = 5, pageNum = 0, name, description }: GetTags) => {
        return await resourceAxios.get<void, PageRespsone<Tag>>('/tags', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { name } : {}),
                // ...(description ? { description } : {})
            }
        })
    },

    createTag: async ({ name, description }: CreateTag) => {
        return await resourceAxios.post<void, Tag>('/tags', {
            name,
            description
        })

    },

    updateTag: async (data: Tag) => {
        const { id, name, description } = data
        await resourceAxios.put<void, void>(`/tags/${id}`, {
            name: data.name,
            description: data.description
        })
    },

    deleteTag: async (id: number) => {
        await resourceAxios.delete<void, void>(`/tags/${id}`)
    }


}