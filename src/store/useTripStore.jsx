import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTripStore = create(

  persist((set) => ({
    // ===
    // data
    // ===
    userTrips: [],
    currentTrip: null,
    currentTripId: null,
    loading: false,
    errorTrip: null,
    lastFetchedUserId: null,

    // ===
    // userTrips
    // ===

    setTrips: (trips) => {
      set({
        userTrips: trips,
        loading: false,
      });
    },

    // ===
    // currentTrip
    // ===

    setTrip: (trip) => {
      set({
        currentTrip: trip,
        loading: false,
      });
    },

    // ===
    // loading
    // ===
    setLoading: (value) => {
      set({
        loading: value
      })
    },
    // ===
    // error
    // ===
    setErrorTrip: (error) => {
      set({
        errorTrip: error
      })
    },

    setLastFetchedUserId: (id) => {
      set({
        lastFetchedUserId: id
      })
    },

    setCurrentTripId: (id) => {
      set({
        currentTripId: id
      })
    },

    reset: () =>
      set({
        userTrips: [],
        currentTrip: null,
        loading: false,
        error: null,
        lastFetchedUserId: null,
      })

  }),
    {
      name: "trip_data",
      partialize: (state) => ({
        userTrips: state.userTrips,
        currentTripId: state.currentTripId,
        currentTrip: state.currentTrip,
        lastFetchedUserId: state.lastFetchedUserId
      }),
    },
  ));
