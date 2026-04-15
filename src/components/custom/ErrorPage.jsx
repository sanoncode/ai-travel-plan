import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-5">
      <div className="w-full max-w-xl py-20 border rounded-xl flex flex-col items-center">
        
        <h1 className="text-5xl font-bold">⚠️</h1>

        <h2 className="text-xl font-semibold mt-5">
          Failed to load data
        </h2>

        <p className="text-gray-500 mt-2 max-w-md">
          Something went wrong while fetching your data. 
          This might be a temporary issue. Please try again or come back later.
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

export default ErrorPage;