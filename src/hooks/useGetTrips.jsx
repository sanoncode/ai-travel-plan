import { safeAsync } from "@/lib/utils";
import { fetchUserTrips, fetchUserTripById } from "@/services/fetchTrips";
import { useTripStore } from "@/store/useTripStore";
import { useShallow } from "zustand/shallow";

export const useGetTrips = () => {
   const {
      userTrips,
      setTrip,
      setTrips,
      setLoading,
      setErrorTrip,
    } = useTripStore(
      useShallow((state) => ({
        userTrips: state.userTrips,
        setTrips: state.setTrips,
        setLoading: state.setLoading,
        setErrorTrip: state.setErrorTrip,
        setTrip: state.setTrip,

      })),
    );

  const GetUserTrips = async (userId) => {


    // =======================
    // START LOADING
    // =======================
    setLoading(true);

    const [trips, error] = await safeAsync(() => fetchUserTrips(userId));

    if (error) {
      setErrorTrip(error.message);
      return;
    }
    // =======================
    // SET TRIPS
    // =======================
    setTrips(trips);
    setLoading(false);
  };

  const GetUserTrip = async (tripId) => {

    //  =======================
    // START LOADING
    // =======================
    setLoading(true);

    const [trip, error] = await safeAsync(() => fetchUserTripById(tripId));

    if (error) {
      setErrorTrip(error.message);
      return;
    }
    // =======================
    // SET TRIP
    // =======================
    setTrip(trip);
    setLoading(false);
  };

  return {
    GetUserTrips,
    GetUserTrip,
  };
};
