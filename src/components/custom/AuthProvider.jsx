import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

function AuthProvider ({children}){

    const {
        setUser,
        removeUser
    } = useUserStore(useShallow((state)=>({
        setUser: state.setUser,
        removeUser: state.removeUser
    })))

    useEffect(()=>{
        supabase.auth.getUser().then(({data}) => {
            if(data?.user) setUser(data.user)
            else removeUser()
        })
        const {data: listener} = supabase.auth.onAuthStateChange(
        (_event, session) => {
            if(session?.user) setUser(session.user)
            else removeUser()
        }
    )
     return () => listener.subscription.unsubscribe();
    },[])

    return children
}

export default AuthProvider