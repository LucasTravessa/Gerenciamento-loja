import { create } from 'zustand'

type props = {
    login: boolean,
    toggleLogin: () => void
}

export const useLogin = create<props>((set) => ({
    login: false,
    toggleLogin: () => set((state) => ({ login: !state.login }))
}))