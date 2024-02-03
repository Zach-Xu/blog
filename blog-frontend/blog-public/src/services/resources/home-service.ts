import { resourceAxios } from "../../utils/axios-utils"

export const homeService = {
    getFeaturedArticles: async () => {
        return await resourceAxios.get<void, Article[]>('/articles/featured')
    },

    getSiteOwnerInfo: async () => {
        return await resourceAxios.get<void, UserCard>('/home/owner-card')
    },

    getSiteStats: async () => {
        return await resourceAxios.get<void, SiteStats>('/home/site')
    },

    updateSiteVisitCount: async () => {
        await resourceAxios.post<void, void>('/home/site/visit-count')
    }

}