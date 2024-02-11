import { create } from "zustand"

interface UserState {
    user: User | null
    updateUser: (user: User | null) => void
}

const useUserStore = create<UserState>()(set => ({
    user: null,
    updateUser: (user: User | null) => set(state => ({
        ...state,
        user
    }))
}))

export default useUserStore