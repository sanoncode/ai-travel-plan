import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog";

import { useUserStore } from "@/store/useUserStore";

import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

// eslint-disable-next-line react/prop-types
function GoogleLoginDialog({open, setOpen}) {

  const setUser = useUserStore((state => state.setUser))

    const GoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error, "login error"),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        setUser(response.data)
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
            <img className="mx-auto h-24" src="/kiakialogo.png" />
              <DialogTitle className="font-extrabold text-lg text-center mt-7 mb-20">
              Sign in
              </DialogTitle>
            <Button onClick={() => GoogleLogin()} className=" mt-10 w-full">
              <FcGoogle />
              Continue With Google
            </Button>
        </DialogHeader>
      </DialogContent>
  </Dialog>
  )
}

export default GoogleLoginDialog
