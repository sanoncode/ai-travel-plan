
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import UserTripCarditem from "./components/UserTripCarditem";
import { SkeletonCard } from './components/SkeletonCard'
import { useUserStore } from "@/store/useUserStore";
import { useTripStore } from "@/store/useTripStore";
import { useShallow } from "zustand/react/shallow";

import EmptyTripState from "./components/EmptyTrip";

function MyTrip() {
  const navigate = useNavigate();
  const user = useUserStore((state)=>state.user)
  const { userTrips, loading, fetchUserTrips } = useTripStore(useShallow((state)=>({
        userTrips: state.userTrips,
        loading: state.loading,
        fetchUserTrips: state.fetchUserTrips

  })))

  useEffect(() => {
      if (!user) {
      navigate("/");
      return;
    }
    fetchUserTrips(user?.email)
  }, [user,fetchUserTrips,navigate]);


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl-px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        
        {loading ?(
          <SkeletonCard />
        ): userTrips?.length > 0 ? (
          userTrips.map((trip, index) => (
              <UserTripCarditem key={index} trip={trip} />
            ))
        ) : (
          <EmptyTripState />
        )}

      </div>
    </div>
  );
}

export default MyTrip;
