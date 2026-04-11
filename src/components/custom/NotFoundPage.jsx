import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-5">
      <div className="w-full max-w-xl py-20 border rounded-xl flex flex-col items-center">
        {/* Optional image */}
        {/* 
        <img
          src="/404.png"
          alt="404 Not Found"
          className="w-40 opacity-80"
        /> 
        */}

        <h1 className="text-5xl font-bold">404</h1>

        <h2 className="text-xl font-semibold mt-5">
          Oops! Page not found 🚧
        </h2>

        <p className="text-gray-500 mt-2 max-w-md">
          The page you’re looking for doesn’t exist or might have been moved.
          Let’s get you back on track.
        </p>

        <div className="flex gap-4 mt-10">
          <Button
            className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>

          <Button
            variant="outline"
            className="px-6 py-2 rounded-full font-semibold"
            onClick={() => navigate("/create-trip")}
          >
            Create Trip
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;