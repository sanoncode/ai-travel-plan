
import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from "@/providers/AuthProvider";
import { router } from "./router";
import { Toaster } from "@/components/ui/sonner";

function App() {

  return (
    <AuthProvider>
      <Toaster />
        <RouterProvider router={router} />
   </AuthProvider>
  )
}

export default App
