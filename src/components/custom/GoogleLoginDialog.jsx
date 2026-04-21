import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog";

import { useUserStore } from "@/store/useUserStore";
import { supabase } from '@/lib/supabaseClient'
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

// eslint-disable-next-line react/prop-types
function GoogleLoginDialog({open, setOpen}) {

  const setUser = useUserStore((state => state.setUser))

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.log(error);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
            <img className="mx-auto h-24" src="/kiakialogo.png" />
              <DialogTitle className="font-extrabold text-lg text-center mt-7 mb-20">
              Sign in
              </DialogTitle>
            <Button onClick={() => handleLogin()} className=" mt-10 w-full">
              <FcGoogle />
              Continue With Google
            </Button>
        </DialogHeader>
      </DialogContent>
  </Dialog>
  )
}

export default GoogleLoginDialog
