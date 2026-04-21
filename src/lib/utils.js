import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const safeAsync =  async (fn) => {
    try {
      const data = await fn();
      return [data, null]
    } catch (error) {
      return [null, error]
    }
}

export const normalizeTrip = (data) => {
  const daily = data?.tripData?.daily_itinerary ?? {};

  // normalize setiap day
  const normalizedDaily = Object.fromEntries(
    Object.entries(daily).map(([day, activities]) => [
      day,
      {
        Morning: activities?.Morning ?? [],
        Afternoon: activities?.Afternoon ?? [],
        Evening: activities?.Evening ?? [],
      },
    ])
  );

  return {
    ...data,
    tripData: {
      ...data?.tripData,
      daily_itinerary: normalizedDaily,
    },
  };
};

export const normalizeTrips = (trips) => {
    return trips.map((trip)=>({
      id:trip.id,
      createdAt: trip.created_at,
      ...(trip.result ?? {})
    }))
};

export const getTimeUntilReset = () => {
  const now = new Date()
  const reset = new Date()

  reset.setHours(24, 0, 0, 0)

  const diff = reset - now

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
}