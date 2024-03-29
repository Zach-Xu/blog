import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './slices/menu-slice'
import loadingReducer from './slices/loading-slice'
import authReducer from './slices/auth-slice'
import tagReducer from './slices/tag-slice'
import articleReducer from './slices/article-slice'
import errorMessageReducer from './slices/error-message-slice'
import categoryReducer from './slices/category-slice'
import roleReducer from './slices/role-slice'
import userReducer from './slices/user-slice'

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        loading: loadingReducer,
        auth: authReducer,
        tag: tagReducer,
        article: articleReducer,
        errorMessage: errorMessageReducer,
        category: categoryReducer,
        role: roleReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch