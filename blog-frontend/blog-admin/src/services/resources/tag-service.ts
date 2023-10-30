import { requireTokenHeader, resourceAxios } from "../../utils/axios-utils"

export const tagService = {
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

    addTag: async ({ name, description }: AddTag) => {
        await resourceAxios.post<void, void>('/tags', {
            name,
            description
        }, {
            headers: requireTokenHeader
        })
    }


}