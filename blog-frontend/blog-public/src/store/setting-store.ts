import { create } from "zustand";

interface SettingState {
    isSideBarShown: boolean
    toggleSideBar: (shown: boolean) => void
}

const useSettingStore = create<SettingState>()((set) => ({
    isSideBarShown: false,
    toggleSideBar: (shown: boolean) => set(state => ({
        ...state,
        isSideBarShown: shown
    }))
}))

export default useSettingStore