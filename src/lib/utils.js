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