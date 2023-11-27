import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { roleService } from "../../services/resources/role-service";

interface RoleState extends PageRespsone<Role> {
    currentPageNum: number
    search: {
        enable: boolean | null
        name: string
    }
}

const initialState: RoleState = {
    rows: [],
    total: 0,
    totalPages: 0,
    currentPageNum: 0,
    search: {
        enable: null,
        name: ''
    }
}

export const getRoles = createAsyncThunk('/roles', async (query: GetRoles) => {
    const result = await roleService.getRoles(query)
    return result
})

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        updateSearch: (state, action: PayloadAction<Partial<typeof initialState.search>>) => {
            state.search = {
                ...state.search,
                ...action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.fulfilled, (state, action) => {
                const { rows, total, totalPages } = action.payload
                state.rows = rows
                state.total = total
                state.totalPages = totalPages
            })
    }
})

export default roleSlice.reducer
export const { updateSearch } = roleSlice.actions