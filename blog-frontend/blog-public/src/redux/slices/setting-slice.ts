import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface SettingState {
    isDark: boolean
    isSideBarShown: boolean
}

const initialState: SettingState = {
    isDark: true,
    isSideBarShown: false
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        toggleModSetting: (state, action: PayloadAction<typeof initialState.isDark>) => {
            state.isDark = action.payload
        },
        toggleSideBarSetting: (state, action: PayloadAction<typeof initialState.isSideBarShown>) => {
            state.isSideBarShown = action.payload
        }
    }
})

export default settingSlice.reducer
export const { toggleModSetting, toggleSideBarSetting } = settingSlice.actions