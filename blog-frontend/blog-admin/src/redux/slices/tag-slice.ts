import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { tagService } from "../../services/resources/tag-service"

interface TagState extends PageRespsone<Tag> {
    currentPageNum: number
    name: string
    // description?: string
}

const initialState: TagState = {
    rows: [],
    total: 0,
    totalPages: 0,
    currentPageNum: 0,
    // description: undefined,
    name: ''
}

export const getTags = createAsyncThunk('/tags', async (query: GetTags) => {
    const result = await tagService.getTags(query)
    return result
})

export const deleteTag = createAsyncThunk('/tags/delete', async (id: number) => {
    await tagService.deleteTag(id)
    return id
})

export const createTag = createAsyncThunk('/tags/create', async (data: CreateTag) => {
    const tag = await tagService.createTag(data)
    return tag
})

export const updateTag = createAsyncThunk('/tags/update', async (data: Tag) => {
    await tagService.updateTag(data)
    return data
})

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        updateSearchName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        updatePageNum: (state, action: PayloadAction<number>) => {
            state.currentPageNum = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTags.fulfilled, (state, action) => {
                const { rows, total, totalPages } = action.payload
                state.rows = rows
                state.total = total
                state.totalPages = totalPages
            })
            .addCase(createTag.fulfilled, (state, action) => {
                const tag = action.payload
                if (state.rows.length >= 5) {
                    state.rows.pop()
                    state.total++
                    state.totalPages = Math.ceil(state.total / 5)
                }
                state.rows.unshift(tag)
            })
            .addCase(updateTag.fulfilled, (state, action) => {
                const updatedTag = action.payload
                state.rows = state.rows.map(tag => {
                    if (tag.id !== updatedTag.id) {
                        return tag
                    } else {
                        return {
                            ...tag,
                            ...updatedTag
                        }
                    }
                })
            })
            .addCase(deleteTag.fulfilled, (state, action) => {
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

export const { updatePageNum, updateSearchName } = tagSlice.actions
export default tagSlice.reducer