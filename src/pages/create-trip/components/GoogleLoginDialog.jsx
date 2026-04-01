import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
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

        console.log(response.data, 'response')
        setUser(response.data)
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogTitle>
        <DialogDescription>
          <img src="/kiakialogo.png" />
          <h2 className="font-extrabold text-lg mt-7">
            Sign in with google
          </h2>
          <p>sign in to the App with Google Authentication securely</p>
          <Button onClick={() => GoogleLogin()} className="mt-10 w-full">
            <FcGoogle />
            Signin With Google
          </Button>
        </DialogDescription>
      </DialogTitle>
    </DialogContent>
  </Dialog>
  )
}

export default GoogleLoginDialog
