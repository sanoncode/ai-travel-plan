import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import GoogleLoginDialog from "@/components/custom/GoogleLoginDialog";
import Images from "./Images";
import { useShallow } from "zustand/react/shallow";
import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useTripStore } from "@/store/useTripStore";

function Header() {
  const { user, removeUser, openLoginDialog, setOpenLoginDialog } =
    useUserStore(
      useShallow((state) => ({
        user: state.user,
        openLoginDialog: state.openLoginDialog,
        removeUser: state.removeUser,
        setOpenLoginDialog: state.setOpenLoginDialog,
      })),
    );

  const resetCreateTripStore = useCreateTripStore((state) => state.reset);
  const resetTripStore = useTripStore((state) => state.reset);

  const handleLogout = async () => {
  
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    window.location.replace("/");
    removeUser();
    
    resetCreateTripStore()
    resetTripStore()

    useCreateTripStore.persist.clearStorage()
    useTripStore.persist.clearStorage()
   
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <a href="/">
            <Images
              className="h-16 w-auto object-contain"
              width="auto"
              src="/kiakialogo.png"
              alt="Kiakia Logo"
            />
          </a>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <a href={"/create-trip"}>
              <Button className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition">
                + Create Trip
              </Button>
            </a>
            <a href={"/my-trip"}>
              <Button className="px-6 py-2 bg-[#2D3436] text-white rounded-full font-semibold hover:bg-black transition">
                My Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <Images
                  src={user?.avatar}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => handleLogout()}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <a href={"/create-trip"}>
              <Button className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition">
                + Create Trip
              </Button>
            </a>
            <Button
              className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-slate-500 transition"
              onClick={() => setOpenLoginDialog(true)}
            >
              Sign in
            </Button>
          </div>
        )}
        <GoogleLoginDialog
          open={openLoginDialog}
          setOpen={setOpenLoginDialog}
        />
      </nav>
    </>
  );
}

export default Header;
