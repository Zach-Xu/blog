import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "../../services/auth-sevice"

const initialState: {
    user: User | null
} = {
    user: null
}

export const login = createAsyncThunk('/login', async (data: LoginRequest) => {
    const result = await authService.login(data)
    return result
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    const { user, jwt } = action.payload
                    state.user = user
                    localStorage.setItem('tk', jwt)
                }
            })
        // rejected promises are aleady handled by intercepters

    }
})


export default authSlice.reducer
