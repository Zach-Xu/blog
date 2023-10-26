import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface PathState {
    path: string[] | null
}

interface UpdatePayload {
    path: string | null
}

const initialState: PathState = {
    path: []
}

export const pathSlice = createSlice({
    name: 'path',
    initialState,
    reducers: {
        updateRouterPath(state, action: PayloadAction<UpdatePayload>) {
            let { path: pathStr } = action.payload
            const path = pathStr?.split('/').filter(part => part !== '' && part !== 'index')
            path?.unshift('/Dashboard')
            return {
                ...state,
                path: path ?? null
            }
        }
    }
})

export const { updateRouterPath } = pathSlice.actions
export default pathSlice.reducer