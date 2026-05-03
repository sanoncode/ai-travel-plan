import { safeAsync } from "@/lib/utils";
import { fetchUserTrips, fetchUserTripById } from "@/services/fetchTrips";
import { useTripStore } from "@/store/useTripStore";
import { useShallow } from "zustand/shallow";

export const useGetTrips = () => {
  const {
    setTrip,
    setTrips,
    setLoading,
    setErrorTrip,
    setLastFetchedUserId,
    setCurrentTripId
  } = useTripStore(
    useShallow((state) => ({
      setTrips: state.setTrips,
      setLoading: state.setLoading,
      setErrorTrip: state.setErrorTrip,
      setTrip: state.setTrip,
      setLastFetchedUserId: state.setLastFetchedUserId,
      setCurrentTripId: state.setCurrentTripId
    })),
  );

  const GetUserTrips = async (userId) => {

      const { userTrips, lastFetchedUserId } = useTripStore.getState()
      const isCached = userTrips.length > 0 && lastFetchedUserId === userId
 
      if(isCached){
        return;
      }

 
      setLoading(true)
      const [trips, error] = await safeAsync(() => fetchUserTrips(userId));
     

      if (error) {
        setErrorTrip(error.message);
        setLoading(false)
        return;
      }
      // =======================
      // SET TRIPS
      // =======================
      setTrips(trips);
      setLastFetchedUserId(userId)
      setLoading(false);
      return;
     
  };

  const GetUserTrip = async (tripId) => {

     const { currentTripId } = useTripStore.getState()

     const isCached = tripId === currentTripId 
 
      if(isCached){
        return;
      }

    //  =======================
    // START LOADING
    // =======================
    setLoading(true);

    const [trip, error] = await safeAsync(() => fetchUserTripById(tripId));

    if (error) {
      setErrorTrip(error.message);
      setLoading(false);
      return;
    }
    // =======================
    // SET TRIP
    // =======================
    setTrip(trip);
    setCurrentTripId(tripId)
    setLoading(false);
  };

  return {
    GetUserTrips,
    GetUserTrip,
  };
};
