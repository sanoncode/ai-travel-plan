import { supabase } from "./supabaseServer.js";

// const getUTCdayRange = (date = new Date()) => {

//     const start = new Date(Date.UTC(
//         date.getUTCFullYear(),
//         date.getUTCMonth(),
//         date.getUTCDate(),
//         0,0,0,0
//     ))

//      const end = new Date(Date.UTC(
//         date.getUTCFullYear(),
//         date.getUTCMonth(),
//         date.getUTCDate(),
//         23,59,59,999
//     ))

//     return {
//         start: start.toISOString(),
//         end: end.toISOString()
//     }
// }

export const checkLimitTrip = async ({ userId, limit = 3 }) => {
  // const { start, end } = getUTCdayRange(date)
  const now = new Date();

  const createdDate = now.toISOString().split("T")[0];

  const { count, error } = await supabase
    .from("trips")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("created_date", createdDate);

  // .gte('created_at', start)
  // .lte('created_at', end)

  if (error) throw error;

  return count >= limit;
};
