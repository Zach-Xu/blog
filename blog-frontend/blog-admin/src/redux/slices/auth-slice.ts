import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "../../services/auth/auth-sevice"

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
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        // all axios request will be fulfilled because the way we configured
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

export const { updateUser } = authSlice.actions
export default authSlice.reducer
