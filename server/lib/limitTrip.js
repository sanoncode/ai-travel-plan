import { supabase } from './supabaseServer.js'

export const checkLimitTrip = async (userId) => {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { count, error } = await supabase
    .from('trips')
    .select('*', { count: "exact", head: true })
    .eq('user_id', userId )
    .gte('created_at', todayStart.toISOString());

    if(error) throw error;

    return count >= 3;
}

