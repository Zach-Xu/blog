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

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        updateSearchName: (state, action: PayloadAction<string>) => {
            console.log('updating search name...')
            state.name = action.payload
        },
        updatePageNum: (state, action: PayloadAction<number>) => {
            state.currentPageNum = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTags.fulfilled, (state, action) => {
                if (action.payload) {
                    const { rows, total, totalPages } = action.payload
                    state.rows = rows
                    state.total = total
                    state.totalPages = totalPages
                }
            })
    }
})

export const { updatePageNum, updateSearchName } = tagSlice.actions
export default tagSlice.reducer