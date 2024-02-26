import { create } from "zustand";

interface SettingState {
    isSideBarShown: boolean
    isLoginModalShown: boolean
    isRegisterModalShown: boolean
    toggleSideBar: (shown: boolean) => void
    toggleLoginModal: (shown: boolean) => void
    toggleRegisterModal: (shown: boolean) => void
}

const useSettingStore = create<SettingState>()((set) => ({
    isSideBarShown: false,
    isLoginModalShown: false,
    isRegisterModalShown: false,
    toggleSideBar: (shown: boolean) => set(state => ({
        ...state,
        isSideBarShown: shown
    })),
    toggleLoginModal: (shown: boolean) => set(state => ({
        ...state,
        isLoginModalShown: shown
    })),
    toggleRegisterModal: (shown: boolean) => set(state => ({
        ...state,
        isRegisterModalShown: shown
    })),
}))

export default useSettingStore