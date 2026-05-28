
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "@/pages/home";
import CreateTrip from "@/pages/create-trip";
import ViewTrip from "@/pages/view-trip/[tripid]";
import MyTrip from "@/pages/my-trip";
import NotFoundPage from "@/components/custom/NotFoundPage";
import RootLayout from "@/layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-trip",
        element: <CreateTrip />,
      },
      {
        path: "view-trip/:tripid",
        element: <ViewTrip />,
      },
      {
        path: "my-trip",
        element: <MyTrip />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);