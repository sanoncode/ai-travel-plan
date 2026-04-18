import { create } from "zustand";

export const useUserStore = create((set)=>({

    //data
    user: JSON.parse(localStorage.getItem('user') || "null"),
    openLoginDialog: false,

    //action
        setUser: (userData) => {
        const mappedUser = {
        id: userData.id,
        name: userData.user_metadata?.full_name,
        email: userData.email,
        avatar: userData.user_metadata?.avatar_url,
        };

        localStorage.setItem("user", JSON.stringify(mappedUser));
        set({ user: mappedUser });
    },
    removeUser: () => {
        localStorage.removeItem('user')
        set({user: null})
    },
    setOpenLoginDialog: () => set((state)=> ({openLoginDialog: !state.openLoginDialog})),
}))