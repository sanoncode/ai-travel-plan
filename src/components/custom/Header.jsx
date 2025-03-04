import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Images from "./Images";


function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
    const [openDialog, setopenDialog] = useState(false);

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
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.replace("/create-trip");
        setopenDialog(false)
      });
  };
 
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img src="/logo.svg" />
      </a>
      {user ? (
        <div className="flex items-center gap-3">
           <a href='/create-trip'>
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
          </a>
          <a href='/my-trip'>
            <Button variant="outline" className="rounded-full">
              My Trip
            </Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <Images 
               src={user?.picture}
               className="h-[35px] w-[35px] rounded-full"/>
            </PopoverTrigger>
            <PopoverContent>
              <h2
              className="cursor-pointer"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.replace("/");
                }}
              >
                Logout
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={()=> setopenDialog(true)}>Sign in</Button>

      )}
        <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-extrabold text-lg mt-7">
                Sign in with google
              </h2>
              <p>sign in to the App with Google Authentication securely</p>
              <Button onClick={() => GoogleLogin()} className="mt-10 w-full">
                <FcGoogle />
                Signin With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
