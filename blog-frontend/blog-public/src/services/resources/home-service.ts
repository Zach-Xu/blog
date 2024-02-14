import { resourceAxios } from "../../utils/axios-utils"

export const homeService = {
    getFeaturedArticles: async () => {
        return await resourceAxios.get<void, FeaturedArticle[]>('/articles/featured')
    },

    getSiteOwnerInfo: async () => {
        return await resourceAxios.get<void, UserCard>('/home/owner-card')
    },

    getSiteStats: async () => {
        return await resourceAxios.get<void, SiteStats>('/home/site')
    },

    updateSiteVisitCount: async () => {
        await resourceAxios.post<void, void>('/home/site/visit-count')
    },

    getAboutMe: async () => {
        return await resourceAxios.get<void, AboutMe>('/home/about')

    },

    getLatestComments: async () => {
        return await resourceAxios.get<void, LatestComment[]>('/comments/latest')
    }

}