import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { menuService } from "../../services/resources/menu-service"

interface MenuState {
    selectedMenuId: number | null
    menus: Menu[]
    search: {
        enable: boolean | null
        name: string
    }
}

interface UpdatePayload {
    id: number | null
}

const initialState: MenuState = {
    selectedMenuId: null,
    menus: [],
    search: {
        enable: null,
        name: ''
    }
}

export const getMenusInTree = createAsyncThunk('/menus/all/tree', async (query: GetMenus) => {
    const result = await menuService.getMenusInTree(query)
    return result
})

export const chanegMenuStatus = createAsyncThunk('/menus/status', async (request: ChangeStatusRequest) => {
    await menuService.chanegMenuStatus(request)
    return request.id
})


const updateMenus = (menus: Menu[], id: number, enable: boolean): Menu[] => {
    return menus.map(menu => {
        if (menu.id === id) {
            return {
                ...menu,
                enable
            }
        } else if (!menu.subMenus || menu.subMenus.length === 0) {
            return menu
        } else {
            return {
                ...menu,
                subMenus: updateMenus(menu.subMenus, id, enable)
            }
        }
    })
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateSelectedMenu(state, action: PayloadAction<UpdatePayload>) {
            let { id } = action.payload
            state.selectedMenuId = id
        },
        updateSearch: (state, action: PayloadAction<Partial<typeof initialState.search>>) => {
            state.search = {
                ...state.search,
                ...action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenusInTree.fulfilled, (state, action) => {
                state.menus = action.payload
            })
            .addCase(chanegMenuStatus.pending, (state, action) => {
                const { id, enable } = action.meta.arg

                const newMenus = updateMenus(state.menus, id, enable)
                state.menus = newMenus
            })
            .addCase(chanegMenuStatus.rejected, (state, action) => {
                const { id, enable } = action.meta.arg
                state.menus = state.menus.map(menu => {
                    if (menu.id !== id) {
                        return menu
                    } else {
                        return {
                            ...menu,
                            enable: !enable
                        }
                    }
                })
            })
    }
})

export const { updateSelectedMenu, updateSearch } = menuSlice.actions
export default menuSlice.reducer