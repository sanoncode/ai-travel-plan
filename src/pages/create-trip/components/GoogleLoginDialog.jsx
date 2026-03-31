import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

// eslint-disable-next-line react/prop-types
function GoogleLoginDialog({open, setOpen, googleLogin}) {

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
          <Button onClick={() => googleLogin()} className="mt-10 w-full">
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
