import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorMessageState {
    article: ArticleError
}

type ArticleError = {
    [K in keyof WriteArticle]: string
}

const initialState: ErrorMessageState = {
    article: {
        title: '',
        summary: '',
        categoryId: '',
        tagIds: '',
        content: '',
        allowedComment: '',
        pinned: ''
    }
}

export const errorMessageSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        updateErrorMessage: (state, action: PayloadAction<Partial<ArticleError>>) => {
            state.article = {
                ...state.article,
                ...action.payload
            }
        }
    }
})

export default errorMessageSlice.reducer
export const { updateErrorMessage } = errorMessageSlice.actions