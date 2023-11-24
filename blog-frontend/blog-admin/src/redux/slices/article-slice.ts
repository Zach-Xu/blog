import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { articleService } from "../../services/resources/article-service";

interface ArticleState extends PageRespsone<Article> {
    writeArticle: WriteArticle & {
        preview: boolean
    },
    currentPageNum: number,
    search: {
        title: string
        summary: string
    },
    editArticle: WriteArticle & {
        preview: boolean
        thumbnail: string
    }
}

const initialState: ArticleState = {
    rows: [],
    total: 0,
    totalPages: 0,
    currentPageNum: 0,
    search: {
        title: '',
        summary: ''
    },
    writeArticle: {
        title: '',
        content: '',
        categoryId: undefined,
        tagIds: [],
        summary: '',
        pinned: true,
        allowedComment: true,
        preview: false
    },
    editArticle: {
        title: '',
        content: '',
        categoryId: undefined,
        tagIds: [],
        summary: '',
        pinned: true,
        allowedComment: true,
        preview: false,
        thumbnail: ''
    }
}

export const createArticle = createAsyncThunk('/articles/create', async (data: WriteArticleRequest) => {
    await articleService.createArticle(data)
})

export const getArticles = createAsyncThunk('/articles', async (query: GetArticles) => {
    const result = await articleService.getArticles(query)
    return result
})

export const updateArticle = createAsyncThunk('/articles/update', async (request: UpdateArticleRequest) => {
    const result = await articleService.updateArticle(request)
    return result
})

export const deleteArticle = createAsyncThunk('/articles/delete', async (id: number) => {
    await articleService.deleteArticle(id)
    return id
})


export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        updateWriteArticle: (state, action: PayloadAction<Partial<typeof initialState.writeArticle>>) => {
            state.writeArticle = {
                ...state.writeArticle,
                ...action.payload
            }
        },
        updateSearch: (state, action: PayloadAction<Partial<typeof initialState.search>>) => {
            state.search = {
                ...state.search,
                ...action.payload
            }
        },
        updateEditArticle: (state, action: PayloadAction<Partial<typeof initialState.editArticle>>) => {
            state.editArticle = {
                ...state.editArticle,
                ...action.payload
            }
        },
        initEditArticle: (state, action: PayloadAction<ArticleDetails>) => {
            const { title, content, summary, category, tags, pinned, allowedComment, thumbnail } = action.payload
            const categoryId = category.id
            const tagIds = tags ? tags.map(tag => tag.id) : []

            state.editArticle = {
                title,
                content,
                summary,
                categoryId,
                tagIds,
                pinned,
                allowedComment,
                thumbnail,
                preview: false
            }
        }
    }, extraReducers: (buidler) => {
        buidler
            .addCase(createArticle.fulfilled, (state, _) => {
                state.writeArticle = initialState.writeArticle
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                const { rows, total, totalPages } = action.payload
                state.rows = rows
                state.total = total
                state.totalPages = totalPages
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                const updatedArticle = action.payload
                state.rows = state.rows.map(article => {
                    if (article.id !== updatedArticle.id) {
                        return article
                    } else {
                        return {
                            ...article,
                            ...updatedArticle
                        }
                    }
                })
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                const { rows, currentPageNum } = state
                state.rows = rows.filter(article => article.id != action.payload)
                if (state.rows.length === 0 && currentPageNum > 0) {
                    state.currentPageNum--
                }
                state.total--
                state.totalPages = Math.ceil(state.total / 5)
            })
    }
})

export default articleSlice.reducer
export const { updateWriteArticle, updateSearch, updateEditArticle, initEditArticle } = articleSlice.actions