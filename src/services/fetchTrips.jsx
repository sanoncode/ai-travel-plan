import { normalizeTrip } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { normalizeTrips } from "@/lib/utils";
// === ERROR TYPE (biar konsisten & anti typo)
export const ERROR_TYPE = {
  VIEW_TRIP_ERROR: "VIEW_TRIP_ERROR",
  MY_TRIP_ERROR: "MY_TRIP_ERROR",
};

const fetchUserTrips = async (userId) => {

  const response = await supabase
    .from('trips')
    .select(`
      id,
      created_at,
      result
    `, { count: 'exact' })
    .eq('user_id', userId) // 🔥 tetap ada
    .order('created_at', { ascending: false })
      
    const trips = normalizeTrips(response.data) 
      
  return trips
};

const fetchUserTripById = async (tripId) => {
  const response = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single();

    const trip = normalizeTrip(response.data.result)

  return trip
};

export {
  fetchUserTrips,
  fetchUserTripById
}
