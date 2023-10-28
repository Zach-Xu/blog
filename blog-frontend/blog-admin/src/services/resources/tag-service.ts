import { resourceAxios } from "../../utils/axios-utils"

export const tagService = {
    getTags: async ({ pageSize = 5, pageNum = 0, name, description }: GetTags) => {
        const result = await resourceAxios.get<void, PageRespsone<Tag>>('/tags', {
            params: {
                pageSize,
                pageNum,
                ...(name !== '' ? { name } : {}),
                // ...(description ? { description } : {})
            }
        })
        return result
    }

}