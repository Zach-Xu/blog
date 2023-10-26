import { createSlice } from "@reduxjs/toolkit"

interface LoadingState {
    isLoading: boolean
}

const initialState: LoadingState = {
    isLoading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        onLoading(state) {
            state.isLoading = true
        },
        endLoading(state) {
            state.isLoading = false
        }
    }
})

export const { onLoading, endLoading } = loadingSlice.actions
export default loadingSlice.reducer