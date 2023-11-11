import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../services/resources/category-service";

interface CategoryState extends PageRespsone<Category> {
    currentPageNum: number
    parents: ParentCategory[]
    search: {
        enable: boolean | null
        name: string
    }
}

const initialState: CategoryState = {
    rows: [],
    total: 0,
    totalPages: 0,
    currentPageNum: 0,
    search: {
        enable: null,
        name: ''
    },
    parents: []
}

export const getParentCategories = createAsyncThunk('/categories/parents', async () => {
    const result = await categoryService.getParentCategories()
    return result
})

export const getCategories = createAsyncThunk('/categories', async (query: GetCategories) => {
    const result = await categoryService.getCategories(query)
    return result
})

export const changeCategoryStatus = createAsyncThunk('/category/status', async (request: ChangeCategoryStatus) => {
    const result = await categoryService.changeCategoryStatus(request)
    return result
})

export const deleteCategory = createAsyncThunk('/categories/delete', async (id: number) => {
    await categoryService.deleteCategory(id)
    return id
})

export const createCategory = createAsyncThunk('/categories/create', async (data: CreateCategory) => {
    const result = await categoryService.createCategory(data)
    return result
})

export const updateCategory = createAsyncThunk('/categories/update', async (data: UpdateCategory) => {
    await categoryService.updateCategory(data)
    return data
})


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateSearchName: (state, action: PayloadAction<string>) => {
            state.search.name = action.payload
        },
        updateSearchStatus: (state, action: PayloadAction<boolean | null>) => {
            state.search.enable = action.payload
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                const { rows, total, totalPages } = action.payload
                state.rows = rows
                state.total = total
                state.totalPages = totalPages
            })
            .addCase(getParentCategories.fulfilled, (state, action) => {
                state.parents = action.payload
            })
            .addCase(changeCategoryStatus.pending, (state, action) => {
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
            .addCase(changeCategoryStatus.rejected, (state, action) => {
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
            .addCase(createCategory.fulfilled, (state, action) => {
                const tag = action.payload
                if (state.rows.length >= 5) {
                    state.rows.pop()
                    state.total++
                    state.totalPages = Math.ceil(state.total / 5)
                }
                state.rows.unshift(tag)
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
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
            .addCase(deleteCategory.fulfilled, (state, action) => {
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

export default categorySlice.reducer
export const { updateSearchName, updateSearchStatus } = categorySlice.actions