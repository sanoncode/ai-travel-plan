 import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import CreateTrip from "./pages/create-trip";
import ViewTrip from "./pages/view-trip/[tripid]";
import MyTrip from "./pages/my-trip";
import NotFoundPage from "./components/custom/NotFoundPage";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create-trip",
    element: <CreateTrip/>
  },
  {
    path: "/view-trip/:tripid",
    element: <ViewTrip/>
  },
  {
    path: "/my-trip",
    element: <MyTrip/>
  },
  {
    path: "/*",
    element: <NotFoundPage/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router}>
      </RouterProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
  
);
