import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './slices/menu-slice'
import routerReducer from './slices/router-path-slice'
import loadingReducer from './slices/loading-slice'
import authReducer from './slices/auth-slice'
import tagReducer from './slices/tag-slice'

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        router: routerReducer,
        loading: loadingReducer,
        auth: authReducer,
        tag: tagReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch