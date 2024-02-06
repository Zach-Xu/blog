import { resourceAxios } from "../../utils/axios-utils"

export const tagService = {
    getTagStats: async () => {
        return await resourceAxios.get<void, TagStats[]>('/tags/stats')
    }
}