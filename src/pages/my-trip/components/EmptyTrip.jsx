import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function EmptyTripState() {
  const navigate = useNavigate();

  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-20 border rounded-xl">
      {/* <img
        src="/empty-trip.png"
        alt="No Trips"
        className="w-40 opacity-80"
      /> */}

      <h2 className="text-xl font-semibold mt-5">
        You don’t have any trips yet ✈️
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Start planning your first journey and let AI create a personalized
        travel plan for you.
      </p>
      <Button
        className="px-6 py-2 mt-10 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition"
        onClick={() => navigate("/create-trip")}
      >
        Create Your First Trip
      </Button>
    </div>
  );
}

export default EmptyTripState;
