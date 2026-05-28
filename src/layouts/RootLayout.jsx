import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout() {
  return (
    <div className=" min-h-screen bg-[url('/city-map.png')] bg-repeat">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}