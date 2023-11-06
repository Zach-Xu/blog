import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { articleService } from "../../services/resources/article-service";

interface ArticleState {
    articles: any
    writeArticle: WriteArticle & {
        preview: boolean
    }
}

const initialState: ArticleState = {
    articles: [],
    writeArticle: {
        title: '',
        content: '',
        categoryId: undefined,
        tagIds: [],
        summary: undefined,
        pinned: true,
        allowedComment: true,
        preview: false
    }
}

export const createArticle = createAsyncThunk('/articles/create', async (data: WriteArticleRequest) => {
    await articleService.createArticle(data)
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
        }
    }, extraReducers: (buidler) => {
        buidler
            .addCase(createArticle.fulfilled, (state, _) => {
                state.writeArticle = initialState.writeArticle
            })
    }
})

export default articleSlice.reducer
export const { updateWriteArticle } = articleSlice.actions