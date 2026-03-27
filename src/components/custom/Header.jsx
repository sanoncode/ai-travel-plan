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
  DialogClose
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Images from "./Images";
import { DialogTitle } from "@radix-ui/react-dialog";


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
    <>
     <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center">
            <a href="/">
                <Images className="h-16 w-auto object-contain" width="auto" src="/kiakialogo.png" alt="Kiakia Logo" />
            </a>
        </div>

         {user ? (
        <div className="flex items-center gap-3">
           <a href='/create-trip'>
           <button className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition">+ Create Trip</button>
          </a>
          <a href='/my-trip'>
            <button className="px-6 py-2 bg-[#2D3436] text-white rounded-full font-semibold hover:bg-black transition">My Trip</button>
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
        <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <Images className="h-16 w-auto object-contain" width="auto" src="/kiakialogo.png" />
              <DialogTitle className="font-extrabold text-2xl mt-5">  Welcome to Kiakia Travel Planner</DialogTitle>
              <DialogDescription>sign in to the App with Google Authentication securely</DialogDescription>
              <Button onClick={() => GoogleLogin()} className="mt-10 w-full">
                <FcGoogle />
                Signin With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
                  
        </DialogContent>
      </Dialog>
    </nav>
    </>
   
  
  );
}

export default Header;
