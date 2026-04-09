import { create } from "zustand";

export const useUserStore = create((set)=>({
    user: JSON.parse(localStorage.getItem('user') || null),
    openLoginDialog: false,
    setUser: (userData) => {
        localStorage.setItem('user',JSON.stringify(userData))
        set({user: userData})
    },
    removeUser: () => {
        localStorage.removeItem('user')
        set({user: null})
    },
    setOpenLoginDialog: () => set((state)=> ({openLoginDialog: !state.openLoginDialog})),
}))