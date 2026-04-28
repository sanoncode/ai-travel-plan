import { supabase } from './supabaseServer.js'

export const checkLimitTrip = async (userId) => {
    
    const now = new Date()

    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)

     const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayEnd.getDate() + 1)

    const { count, error } = await supabase
    .from('trips')
    .select('*', { count: "exact", head: true })
    .eq('user_id', userId )
    .gte('created_at', todayStart.toISOString())
    .lt('created_at', todayEnd.toISOString())

    if(error) throw error;

    return count >= 3;
}

