import { supabase } from './supabaseServer.js'

export const checkLimitTrip = async (userId) => {

    const now = new Date()

    const startOfTheDay = new Date(now.setHours(0,0,0,0)).toISOString()

    const endOfTheDay = new Date(now.setHours(23,59,59,999)).toISOString()
    

    const { count, error } = await supabase
    .from('trips')
    .select('*', { count: "exact", head: true })
    .eq('user_id', userId )
    .gte('created_at', startOfTheDay)
    .lte('created_at', endOfTheDay)

    if(error) throw error;

    return count >= 3;
}

