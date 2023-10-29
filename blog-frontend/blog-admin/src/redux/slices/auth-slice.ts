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

export const verifyToken = createAsyncThunk('/verify-token', async () => {
    const result = await authService.verifyToken()
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
        builder
            .addCase(login.fulfilled, (state, action) => {
                const { user, jwt } = action.payload
                state.user = user
                localStorage.setItem('tk', jwt)
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                const user = action.payload
                state.user = user
            })
    }
})

export const { updateUser } = authSlice.actions
export default authSlice.reducer