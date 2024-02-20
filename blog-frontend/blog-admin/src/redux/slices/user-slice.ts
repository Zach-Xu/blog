import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/resources/user-service";
import { roleService } from "../../services/resources/role-service";

interface UserState extends PageRespsone<UserRow> {
    currentPageNum: number
    search: {
        username: string
        email: string
    },
    roles: RoleNameResponse[]
}

const initialState: UserState = {
    rows: [],
    total: 0,
    totalPages: 0,
    currentPageNum: 0,
    search: {
        username: '',
        email: ''
    },
    roles: []
}


export const getUsers = createAsyncThunk('/users', async (query: GetUsers) => {
    const result = await userService.getUsers(query)
    return result
})

export const changeUserStatus = createAsyncThunk('/user/status', async (request: ChangeStatusRequest) => {
    const result = await userService.changeUserStatus(request)
    return result
})

export const deleteUser = createAsyncThunk('/users/delete', async (id: number) => {
    await userService.deleteUser(id)
    return id
})

export const createUser = createAsyncThunk('/users/create', async (data: CreateUserRequest) => {
    const result = await userService.createUser(data)
    return result
})

export const updateUser = createAsyncThunk('/users/update', async (data: UpdateUserRequest) => {
    await userService.updateUser(data)
    return data
})

export const getAllActiveRoles = createAsyncThunk('/users/roles', async () => {
    const result = await roleService.getAllActiveRoles()
    return result
})


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateSearch: (state, action: PayloadAction<Partial<typeof initialState.search>>) => {
            state.search = {
                ...state.search,
                ...action.payload
            }
        },
        updatePageNum: (state, action: PayloadAction<number>) => {
            state.currentPageNum = action.payload
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                const { rows, total, totalPages } = action.payload
                state.rows = rows
                state.total = total
                state.totalPages = totalPages
            })
            .addCase(changeUserStatus.pending, (state, action) => {
                const { id, enable } = action.meta.arg

                state.rows = state.rows.map(category => {
                    if (category.id !== id) {
                        return category
                    } else {
                        return {
                            ...category,
                            enable
                        }
                    }
                })
            })
            .addCase(changeUserStatus.rejected, (state, action) => {
                const { id, enable } = action.meta.arg
                state.rows = state.rows.map(category => {
                    if (category.id !== id) {
                        return category
                    } else {
                        return {
                            ...category,
                            enable: !enable
                        }
                    }
                })
            })
            .addCase(createUser.fulfilled, (state, action) => {
                const tag = action.payload
                if (state.rows.length >= 5) {
                    state.rows.pop()
                    state.total++
                    state.totalPages = Math.ceil(state.total / 5)
                }
                state.rows.unshift(tag)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedCategory = action.payload
                state.rows = state.rows.map(tag => {
                    if (tag.id !== updatedCategory.id) {
                        return tag
                    } else {
                        return {
                            ...tag,
                            ...updatedCategory
                        }
                    }
                })
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const { rows, currentPageNum } = state
                state.rows = rows.filter(tag => tag.id != action.payload)
                if (state.rows.length === 0 && currentPageNum > 0) {
                    state.currentPageNum--
                }
                state.total--
                state.totalPages = Math.ceil(state.total / 5)
            })
            .addCase(getAllActiveRoles.fulfilled, (state, action) => {
                state.roles = action.payload
            })
    }
})

export default userSlice.reducer
export const { updateSearch, updatePageNum } = userSlice.actions