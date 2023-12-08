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

export const changeRoleStatus = createAsyncThunk('/role/status', async (request: ChangeStatusRequest) => {
    const result = await roleService.changeRoleStatus(request)
    return result
})

export const createRole = createAsyncThunk('/roles/create', async (request: CreateRoleRequest) => {
    const result = await roleService.createRole(request)
    return result
})

export const updateRole = createAsyncThunk('/roles/update', async (request: UpdateRoleRequest) => {
    await roleService.updateRole(request)
    return request
})

export const deleteRole = createAsyncThunk('/roles/delete', async (roleId: number) => {
    await roleService.deleteRole(roleId)
    return roleId
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
            .addCase(changeRoleStatus.pending, (state, action) => {
                const { id, enable } = action.meta.arg

                state.rows = state.rows.map(role => {
                    if (role.id !== id) {
                        return role
                    } else {
                        return {
                            ...role,
                            enable
                        }
                    }
                })
            })
            .addCase(changeRoleStatus.rejected, (state, action) => {
                const { id, enable } = action.meta.arg
                state.rows = state.rows.map(role => {
                    if (role.id !== id) {
                        return role
                    } else {
                        return {
                            ...role,
                            enable: !enable
                        }
                    }
                })
            })
            .addCase(createRole.fulfilled, (state, action) => {
                const role = action.payload
                if (state.rows.length >= 5) {
                    state.rows.pop()
                    state.total++
                    state.totalPages = Math.ceil(state.total / 5)
                }
                state.rows.unshift(role)
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                const updatedRole = action.payload
                state.rows = state.rows.map(role => {
                    if (role.id !== updatedRole.id) {
                        return role
                    } else {
                        return {
                            ...role,
                            ...updatedRole
                        }
                    }
                })
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                const { rows, currentPageNum } = state
                state.rows = rows.filter(tag => tag.id != action.payload)
                if (state.rows.length === 0 && currentPageNum > 0) {
                    state.currentPageNum--
                }
                state.total--
                state.totalPages = Math.ceil(state.total / 5)
            })
    }
})

export default roleSlice.reducer
export const { updateSearch } = roleSlice.actions