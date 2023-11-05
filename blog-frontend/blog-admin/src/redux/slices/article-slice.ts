import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { articleService } from "../../services/resources/article-service";

interface ArticleState {
    articles: any
    writeArticle: WriteArticle
}

const initialState: ArticleState = {
    articles: [],
    writeArticle: {
        title: '',
        content: '**Write down your thoughts here!!!**',
        categoryId: undefined,
        tagIds: [],
        summary: undefined,
        pinned: undefined,
        allowedComment: undefined,
    }
}

export const createArticle = createAsyncThunk('/articles/create', async (data: WriteArticleRequest) => {
    await articleService.createArticle(data)
})


export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        updateWriteArticle: (state, action: PayloadAction<Partial<WriteArticleRequest>>) => {
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