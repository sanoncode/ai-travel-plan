import { normalizeTrip, normalizeTrips } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const fetchUserTrips = async (userId) => {

  // fetch directly from client
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

  // fetch directly from client
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
