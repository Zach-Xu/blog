import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface MenuState {
    selectedMenuId: number | null
}

interface UpdatePayload {
    id: number | null
}

const initialState: MenuState = {
    selectedMenuId: null
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateSelectedMenu(state, action: PayloadAction<UpdatePayload>) {
            let { id } = action.payload
            state.selectedMenuId = id
        }
    }
})

export const { updateSelectedMenu } = menuSlice.actions
export default menuSlice.reducer