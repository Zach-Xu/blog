import { create } from "zustand"

interface ArticleState {
    pageNum: number,
    updatePageNum: (page: number) => void
}

const useArticleStore = create<ArticleState>()((set) => ({
    pageNum: 1,
    articleCount: 0,
    updatePageNum: (page: number) => set(state => ({
        ...state,
        pageNum: page
    })),
}))

export default useArticleStore